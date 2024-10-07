const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
    full_name: {
        type: String,
        required: [true, 'Name is required']
    },
    dob: {
        type: Date,
        required: [true, 'Date of birth is required']
    },
    img: {
        type: String,
        required: [true, 'Image is required']
    },
    introduce: {
        type: String,
        required: [true, 'Introduce is required']
    },
},
    {
        timestamps: true
    });

const author = mongoose.model('author', authorSchema);
module.exports = author;