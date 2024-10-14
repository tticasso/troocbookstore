const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    items: [{ type: Schema.Types.ObjectId, ref: 'cartItem' }],
    total_price: { type: Number, default: 0 }
});

const cart = mongoose.model('cart', CartSchema);
module.exports = cart;
