const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    publication_date: {
        type: Date,
        required: [true, 'Publication date is required']
    },
    img: {
        type: String,
        required: [true, 'Image is required']
    },
    description: {
        type: String,
        required: [true, 'Introduce is required']
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'author',
        required: [true, 'Author is required']
    },
    price: {
        type: Number,
        required: [true, 'Price is required']
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required']
    },
    category: [
        {
            type: Schema.Types.ObjectId,
            ref: 'category',
            required: [true, 'Category is required']
        }
    ],
    isbn: {
        type: String,
        required: [true, 'ISBN is required']
    },
    status: {
        type: String,
        default: 'active',
        Enum: ['active', 'inactive']
    },
    nation: {
        type: Schema.Types.ObjectId,
        ref: 'nation',
        required: [true, 'Nation is required']
    },
    img: {
        type: String,
        required: [true, 'Image is required']
    },
},
    {
        timestamps: true
    });

const book = mongoose.model('book', bookSchema);
module.exports = book;