const db = require('../models');
const Author = db.author;
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

async function createAuthor(req, res) {
    const { full_name, dob, introduce } = req.body;

    try {
        const dobFormatted = dob ? new Date(dob.split('/').reverse().join('-')) : null;

        const newAuthor = new Author({
            full_name,
            dob: dobFormatted,
            img: req.file ? req.file.path : '', // Kiểm tra nếu ảnh không được tải lên
            introduce
        });

        await newAuthor.save();
        res.status(201).json({ message: 'Author created successfully!', author: newAuthor });
    } catch (error) {
        console.error('Error creating author:', error); // Thêm log lỗi
        res.status(500).json({ message: 'Error creating author', error });
    }
}


async function listAuthors(req, res) {
    try {
        const authors = await Author.find();
        res.status(200).json(authors);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching authors', error });
    }
}

async function getAuthor(req, res) {
    const { authorId } = req.params;
    try {
        const author = await Author.findById(authorId);
        if (!author) return res.status(404).json({ message: 'Author not found' });
        res.status(200).json(author);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching author', error });
    }
}

async function updateAuthor(req, res) {
    const { authorId } = req.params;
    const { full_name, dob, introduce } = req.body;

    try {
        const author = await Author.findById(authorId);
        if (!author) return res.status(404).json({ message: 'Author not found' });

        if (full_name) author.full_name = full_name;
        if (dob) author.dob = dob;
        if (introduce) author.introduce = introduce;
        if (req.file) author.img = req.file.path;

        await author.save();
        res.status(200).json({ message: 'Author updated successfully', author });
    } catch (error) {
        res.status(500).json({ message: 'Error updating author', error });
    }
}

async function deleteAuthor(req, res) {
    const { authorId } = req.params;
    try {
        const author = await Author.findByIdAndDelete(authorId);
        if (!author) return res.status(404).json({ message: 'Author not found' });

        res.status(200).json({ message: 'Author deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting author', error });
    }
}

const authorController = {
    createAuthor: [upload.single('img'), createAuthor],
    listAuthors,
    getAuthor,
    updateAuthor: [upload.single('img'), updateAuthor],
    deleteAuthor
};

module.exports = authorController;
