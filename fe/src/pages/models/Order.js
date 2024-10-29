const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    orderCode: { type: String, unique: true, required: true }, // Mã đơn hàng theo định dạng
    items: [{
        book_id: {
            _id: { type: String, required: true },
            title: { type: String, required: true },
            publication_date: { type: Date, required: true },
            img: { type: String, required: true },
            description: { type: String, required: true },
            author: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true },
            category: [{ type: String }],
            isbn: { type: String, required: true },
            status: { type: String, required: true },
            nation: { type: String, required: true },
        },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
    }],
    total_price: { type: Number, required: true },
    products_price: { type: Number, required: true },
    shipping_price: { type: Number, default: 25000 },
    status: { type: String, default: 'pending', enum: ['pending', 'confirmed', 'shipping', 'success', 'cancel'] },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    name: { type: String, required: true },
    note: { type: String },
    orderDate: { type: Date, default: Date.now }
}, { timestamps: true });

// Tạo mã đơn hàng trước khi lưu
orderSchema.pre('save', function (next) {
    if (!this.orderCode) {
        const date = new Date();
        const formattedDate = date.toISOString().slice(0, 10).replace(/-/g, ''); // yyyyMMdd
        const formattedTime = date.toTimeString().slice(0, 8).replace(/:/g, ''); // HHmmss
        const randomCode = Math.random().toString(36).substring(2, 6).toUpperCase(); // 4 ký tự ngẫu nhiên
        this.orderCode = `ORD-${formattedDate}-${formattedTime}-${randomCode}`;
    }
    next();
});

const Order = mongoose.model('order', orderSchema);
module.exports = Order;
