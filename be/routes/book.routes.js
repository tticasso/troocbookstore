const bodyParser = require('body-parser');
const express = require('express');
const { bookController } = require('../controllers');

const bookRouter = express.Router();
bookRouter.use(bodyParser.json());

bookRouter.post('/create', bookController.createBook);
bookRouter.get('/list', bookController.listBooks);
bookRouter.get('/:bookId', bookController.getBook);
bookRouter.put('/update/:bookId', bookController.updateBook);
bookRouter.delete('/delete/:bookId', bookController.deleteBook);
module.exports = bookRouter;