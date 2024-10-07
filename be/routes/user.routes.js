const bodyParser = require('body-parser');
const express = require('express');
const { userController } = require('../controllers');

const userRouter = express.Router();
userRouter.use(bodyParser.json());

//Create route: URI - /create
userRouter.post('/signup', userController.signUp);
userRouter.post('/login', userController.login);
userRouter.get('/list', userController.list);


module.exports = userRouter;