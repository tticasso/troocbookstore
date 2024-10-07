const db = require('../models');
const User = db.user;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Đăng ký người dùng mới
async function signUp(req, res) {
    const {full_name, role, email, password, phone_number, dob, address, gender } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({full_name, role, email, password: hashedPassword, phone_number, dob, address, gender });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
};

// Đăng nhập người dùng
async function login(req, res) {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};

async function list(req, res, next) {
    try {
        await User.find()
            .then(docs => res.status(200).json(docs))
            .catch(error => next(error));
    } catch (error) {
        next(error);
    }
}

const userController = {
    signUp,
    login,
    list
};

module.exports = userController;
