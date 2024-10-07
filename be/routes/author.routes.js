const bodyParser = require('body-parser');
const express = require('express');
const { authorController } = require('../controllers');

const authorRouter = express.Router();
authorRouter.use(bodyParser.json());

authorRouter.post('/create', authorController.createAuthor);
authorRouter.get('/list', authorController.listAuthors);
authorRouter.get('/:authorId', authorController.getAuthor);
authorRouter.put('/update/:authorId', authorController.updateAuthor);
authorRouter.delete('/delete/:authorId', authorController.deleteAuthor);
module.exports = authorRouter;