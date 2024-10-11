const bodyParser = require('body-parser');
const express = require('express');
const { categoryController } = require('../controllers');

const categoryRouter = express.Router();
categoryRouter.use(bodyParser.json());

categoryRouter.post('/create', categoryController.createCategory);
categoryRouter.get('/list', categoryController.listCategories);
categoryRouter.get('/:categoryId', categoryController.getCategory);
categoryRouter.put('/update/:categoryId', categoryController.updateCategory);
categoryRouter.delete('/delete/:categoryId', categoryController.deleteCategory);
module.exports = categoryRouter;