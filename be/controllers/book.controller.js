const db = require('../models');
const Book = db.book;
const multer = require('multer');
const path = require('path');

// Configuring multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Create a new book
async function createBook(req, res) {
    const { title, publication_date, description, author, price, quantity, category, isbn, status, nation } = req.body;

    try {
        const newBook = new Book({
            title,
            publication_date,
            img: req.file ? req.file.path : null,  // Assuming image is uploaded
            description,
            author,
            price,
            quantity,
            category,
            isbn,
            status: status || 'active',
            nation
        });
        await newBook.save();
        res.status(201).json({ message: 'Book created successfully!', book: newBook });
    } catch (error) {
        res.status(500).json({ message: 'Error creating book', error });
    }
}

// List all books
async function listBooks(req, res) {
    try {
        const books = await Book.find() // Populating related fields
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching books', error });
    }
}

// Get a single book by ID
async function getBook(req, res) {
    const { bookId } = req.params;
    try {
        const book = await Book.findById(bookId)
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching book', error });
    }
}

// Update a book by ID
async function updateBook(req, res) {
    const { bookId } = req.params;
    const { title, publication_date, description, author, price, quantity, category, isbn, status, nation } = req.body;

    try {
        const book = await Book.findById(bookId);
        if (!book) return res.status(404).json({ message: 'Book not found' });

        if (title) book.title = title;
        if (publication_date) book.publication_date = publication_date;
        if (description) book.description = description;
        if (author) book.author = author;
        if (price) book.price = price;
        if (quantity) book.quantity = quantity;
        if (category) book.category = category;
        if (isbn) book.isbn = isbn;
        if (status) book.status = status;
        if (nation) book.nation = nation;
        if (req.file) book.img = req.file.path;

        await book.save();
        res.status(200).json({ message: 'Book updated successfully', book });
    } catch (error) {
        res.status(500).json({ message: 'Error updating book', error });
    }
}

// Delete a book by ID
async function deleteBook(req, res) {
    const { bookId } = req.params;
    try {
        const book = await Book.findByIdAndDelete(bookId);
        if (!book) return res.status(404).json({ message: 'Book not found' });

        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting book', error });
    }
}

const bookController = {
    createBook: [upload.single('img'), createBook],  // Handling image upload
    listBooks,
    getBook,
    updateBook: [upload.single('img'), updateBook],  // Handling image upload
    deleteBook
};

module.exports = bookController;
