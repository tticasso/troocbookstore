const db = require('../models');
const User = db.user;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function signUp(req, res) {
    const { full_name, role, email, password, phone_number, dob, address, gender } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists!' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ full_name, role, email, password: hashedPassword, phone_number, dob, address, gender });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
}


async function login(req, res) {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (user.status === 'inactive') return res.status(403).json({ message: 'User account is locked' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};

async function updateUser(req, res) {
    const { userId } = req.params;
    const { full_name, role, email, password, phone_number, dob, address, gender } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (full_name) user.full_name = full_name;
        if (role) user.role = role;
        if (email) user.email = email;
        if (phone_number) user.phone_number = phone_number;
        if (dob) user.dob = dob;
        if (address) user.address = address;
        if (gender) user.gender = gender;

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        await user.save();
        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
}


async function inactiveUser(req, res) {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.status = 'inactive';
        await user.save();

        res.status(200).json({ message: 'User has been locked' });
    } catch (error) {
        res.status(500).json({ message: 'Error locking user', error });
    }
};

async function activeUser(req, res) {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.status = 'active';
        await user.save();

        res.status(200).json({ message: 'User has been locked' });
    } catch (error) {
        res.status(500).json({ message: 'Error locking user', error });
    }
};

async function deleteUser(req, res) {
    const { userId } = req.params;
    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
};

async function getUserDetails(req, res) {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        user.password = undefined;
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving user details', error });
    }
}

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
    list,
    deleteUser,
    activeUser,
    inactiveUser,
    updateUser,
    getUserDetails
};

module.exports = userController;
