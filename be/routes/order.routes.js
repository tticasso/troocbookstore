const bodyParser = require('body-parser');
const express = require('express');
const { orderController } = require('../controllers');

const orderRouter = express.Router();
orderRouter.use(bodyParser.json());

orderRouter.post('/create', orderController.createOrder);
orderRouter.get('/:user_id', orderController.getUserOrders);
orderRouter.get('/detail/:id', orderController.getOrderById);
orderRouter.get('', orderController.getAllOrders);
orderRouter.put('/confirm/:id', orderController.confirmOrder);
orderRouter.put('/ship/:id', orderController.shipOrder);
orderRouter.put('/success/:id', orderController.successOrder);
orderRouter.put('/cancel/:id', orderController.cancelOrder);
module.exports = orderRouter;