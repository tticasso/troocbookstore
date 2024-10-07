const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    full_name: {
        type: String,
        required: [true, 'Name is required']
    },
    role: {
        type: String,
        default: 'user',
        Enum: ['user', 'admin', "logistic", "content-creator"]
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    phone_number: {
        type: Number,
        required: [true, 'Phone Number is required']
    },
    dob: {
        type: Date,
    },
    address: {
        type: String,
    },
    gender: {
        type: String,
        Enum: ["Male", "Female"]
    },
    blogs: [
        {
            type: Schema.Types.ObjectId,
            ref: 'blog'
        }
    ]

},
    {
        timestamps: true
    });

const user = mongoose.model('user', userSchema);
module.exports = user;