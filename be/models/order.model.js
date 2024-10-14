// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
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
    status: { type: String, default: 'pending', Enum: ['pending', 'confirmed', 'shipping', 'success', 'cancel'] }
}, { timestamps: true });

const order = mongoose.model('order', orderSchema);
module.exports = order;