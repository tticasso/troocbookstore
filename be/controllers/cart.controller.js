const db = require('../models');
const Cart = db.cart;
const CartItem = db.cartItem;
const Book = db.book;

// Thêm sản phẩm vào giỏ hàng
// Thêm sản phẩm vào giỏ hàng
// Thêm sản phẩm vào giỏ hàng
async function addToCart(req, res) {
    const { user_id, book_id, quantity } = req.body;

    try {
        const book = await Book.findById(book_id);
        if (!book) return res.status(404).json({ message: 'Book not found' });

        // Tìm giỏ hàng của người dùng, nếu chưa có thì tạo mới
        let cart = await Cart.findOne({ user_id });
        if (!cart) cart = new Cart({ user_id, items: [] });

        // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
        let item = await CartItem.findOne({ _id: { $in: cart.items }, book_id });

        if (item) {
            // Nếu sản phẩm đã có, cộng dồn số lượng thay vì ghi đè
            item.quantity += quantity;  // Cộng thêm số lượng mới vào số lượng hiện tại
            item.price = book.price * item.quantity;  // Cập nhật giá dựa trên tổng số lượng
            await item.save();
        } else {
            // Nếu sản phẩm chưa có trong giỏ hàng, thêm mới
            const newItem = new CartItem({
                book_id,
                quantity,
                price: book.price * quantity
            });
            await newItem.save();
            cart.items.push(newItem._id);
        }

        // Cập nhật tổng giá của giỏ hàng
        cart.total_price = await CartItem.aggregate([
            { $match: { _id: { $in: cart.items } } },
            { $group: { _id: null, total: { $sum: '$price' } } }
        ]).then(result => (result[0] ? result[0].total : 0));

        await cart.save();

        res.status(200).json({ message: 'Product added to cart', cart });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}

// Lấy thông tin giỏ hàng của người dùng
async function getCart(req, res) {
    const { user_id } = req.params;

    try {
        const cart = await Cart.findOne({ user_id }).populate({
            path: 'items',
            populate: { path: 'book_id', model: 'book' }
        });

        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}
// Cập nhật số lượng sản phẩm trong giỏ hàng
async function updateCart(req, res) {
    const { user_id, book_id, quantity } = req.body;

    try {
        const cart = await Cart.findOne({ user_id });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        const item = await CartItem.findOne({ _id: { $in: cart.items }, book_id });
        if (!item) return res.status(404).json({ message: 'Item not found in cart' });

        // Cập nhật số lượng và giá của item
        item.quantity = quantity;
        item.price = item.book.price * quantity;
        await item.save();

        // Tính lại tổng giá giỏ hàng
        cart.total_price = await CartItem.aggregate([
            { $match: { _id: { $in: cart.items } } },
            { $group: { _id: null, total: { $sum: '$price' } } }
        ]).then(result => (result[0] ? result[0].total : 0));

        await cart.save();

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}

// Xóa sản phẩm khỏi giỏ hàng
async function removeFromCart(req, res) {
    const { user_id, item_id } = req.body;

    try {
        // Tìm giỏ hàng theo user_id
        const cart = await Cart.findOne({ user_id }).populate('items.book_id');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        console.log('Cart items:', cart.items); // Kiểm tra cấu trúc của cart.items

        // Tìm item trong giỏ hàng khớp với item_id
        const item = cart.items.find(
            (i) => i._id.toString() === item_id.toString()
        );

        console.log('Item found:', item); // Kiểm tra giá trị của item

        if (!item) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        // Lấy giá trị price từ CartItem trong cơ sở dữ liệu
        const dbItem = await CartItem.findById(item_id).populate('book_id');

        console.log('Item from database:', dbItem); // Kiểm tra giá trị của item

        if (!dbItem || typeof dbItem.price !== 'number') {
            console.error('Item price is invalid:', dbItem ? dbItem.price : 'Item not found');
            return res.status(400).json({ message: 'Item price is invalid' });
        }

        // Loại bỏ item khỏi mảng items
        cart.items = cart.items.filter(
            (i) => i._id.toString() !== item_id.toString()
        );

        // Cập nhật total_price
        cart.total_price = (cart.total_price || 0) - dbItem.price; // Sử dụng giá trị price từ dbItem

        // Lưu giỏ hàng sau khi cập nhật
        await cart.save();

        // Xóa CartItem tương ứng trong database
        await CartItem.findByIdAndDelete(item._id);

        res.status(200).json({
            message: 'Item removed from cart',
            cart,
        });
    } catch (error) {
        res.status(500).json({
            error: 'Internal server error',
            details: error.message,
        });
    }
}
// Xóa toàn bộ giỏ hàng
async function clearCart(req, res) {
    const { user_id } = req.body;
    try {
        // Tìm giỏ hàng theo user_id
        const cart = await Cart.findOne({ user_id });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        // Xóa tất cả các sản phẩm trong giỏ hàng
        await CartItem.deleteMany({ _id: { $in: cart.items } });
        // Xóa giỏ hàng khỏi cơ sở dữ liệu
        await Cart.findByIdAndDelete(cart._id);
        res.status(200).json({ message: 'Cart cleared successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}
async function getCartItemCount(req, res) {
    const { user_id } = req.params;

    try {
        const cart = await Cart.findOne({ user_id }).populate('items');
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        const totalQuantity = cart.items.reduce((sum, item) => sum + item.quantity, 0);

        res.status(200).json({ totalQuantity });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}






// Định nghĩa controller cho giỏ hàng
const cartController = {
    addToCart,
    getCart,
    updateCart,
    removeFromCart,
    clearCart,
    getCartItemCount
};

module.exports = cartController;