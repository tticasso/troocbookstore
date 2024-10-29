const express = require('express');
const bodyParser = require('body-parser');
const authorController = require('../controllers/author.controller'); // Import authorController

const authorRouter = express.Router();
authorRouter.use(bodyParser.json());

authorRouter.post('/create', authorController.createAuthor);
authorRouter.get('/list', authorController.listAuthors);
authorRouter.get('/:authorId', authorController.getAuthor);
authorRouter.put('/update/:authorId', authorController.updateAuthor);
authorRouter.delete('/delete/:authorId', authorController.deleteAuthor);

// Route để lấy danh sách sách của một tác giả
authorRouter.get('/:authorId/books', authorController.getBooksByAuthor);

module.exports = authorRouter;
