// controllers/orderController.js
const db = require('../models');
const Cart = db.cart;
const Order = db.order; // Chắc chắn rằng bạn đã định nghĩa Order trong models

const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${day}${month}${year}`;
};

// Tạo đơn hàng từ giỏ hàng
async function createOrder(req, res) {
    const { user_id, email, phone, address, name, note } = req.body;

    try {
        // Lấy thông tin giỏ hàng
        const cart = await Cart.findOne({ user_id }).populate({
            path: 'items',
            populate: { path: 'book_id', model: 'book' }
        });

        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        const today = new Date();
        const formattedDate = formatDate(today);

        // Đếm số đơn hàng trong ngày
        const orderCount = await Order.countDocuments({
            createdAt: {
                $gte: new Date(today.setHours(0, 0, 0, 0)),
                $lt: new Date(today.setHours(23, 59, 59, 999))
            }
        });

        // Tạo mã order_id: TRCddmmyyXXX
        const orderId = `TRC-${formattedDate}-${String(orderCount + 1).padStart(3, '0')}`;

        // Tạo đơn hàng mới
        const newOrder = new Order({
            order_id: orderId,  // Thêm order_id
            user_id: cart.user_id,
            items: cart.items.map(item => ({
                book_id: item.book_id,
                quantity: item.quantity,
                price: item.price
            })),
            products_price: cart.total_price,
            total_price: cart.total_price + 25000,
            email,
            phone,
            address,
            name,
            note
        });

        const savedOrder = await newOrder.save();

        // Xóa giỏ hàng sau khi tạo đơn hàng
        await Cart.findByIdAndDelete(cart._id);

        res.status(201).json(savedOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}

async function getUserOrders(req, res) {
    const { user_id } = req.params;

    try {
        const orders = await Order.find({ user_id });

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}

async function getOrderById(req, res) {
    const { id } = req.params;

    try {
        const order = await Order.findById(id);
        if (!order) return res.status(404).json({ message: 'Order not found' });

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}

async function getAllOrders(req, res) {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}

async function confirmOrder(req, res) {
    const { id } = req.params;

    try {
        const order = await Order.findByIdAndUpdate(
            id,
            { status: 'confirmed' },
            { new: true }
        );
        if (!order) return res.status(404).json({ message: 'Order not found' });

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}

async function shipOrder(req, res) {
    const { id } = req.params;

    try {
        const order = await Order.findByIdAndUpdate(
            id,
            { status: 'shipping' },
            { new: true }
        );
        if (!order) return res.status(404).json({ message: 'Order not found' });

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}

async function successOrder(req, res) {
    const { id } = req.params;

    try {
        const order = await Order.findByIdAndUpdate(
            id,
            { status: 'success' },
            { new: true }
        );
        if (!order) return res.status(404).json({ message: 'Order not found' });

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}

async function cancelOrder(req, res) {
    const { id } = req.params;

    try {
        const order = await Order.findByIdAndUpdate(
            id,
            { status: 'cancel' },
            { new: true }
        );
        if (!order) return res.status(404).json({ message: 'Order not found' });

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}

// Định nghĩa controller cho order
const orderController = {
    createOrder,
    getUserOrders,
    getOrderById,
    getAllOrders,
    confirmOrder,
    shipOrder,
    successOrder,
    cancelOrder
};

module.exports = orderController;
