const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartItemSchema = new Schema({
    book_id: { type: Schema.Types.ObjectId, ref: 'book', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
});

const cartItem = mongoose.model('cartItem', CartItemSchema);
module.exports = cartItem;
