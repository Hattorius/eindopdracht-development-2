import express from 'express';
export const orders = express.Router();

import * as orders_controller from '../controllers/orders.js';

orders.get('/', orders_controller.read);
orders.post('/', orders_controller.create);
orders.patch('/:order_id', orders_controller.update);