const bodyParser = require('body-parser');
const express = require('express');
const { cartController } = require('../controllers');

const cartRouter = express.Router();
cartRouter.use(bodyParser.json());

cartRouter.post('/add', cartController.addToCart);
cartRouter.get('/:user_id', cartController.getCart);
cartRouter.put('/update', cartController.updateCart);
cartRouter.delete('/remove', cartController.removeFromCart);
module.exports = cartRouter;