
import express from 'express';
export const products = express.Router();

import * as products_controller from '../controllers/products.js';

products.get('/', products_controller.read);
products.get('/:product_id', products_controller.read);
products.patch('/:product_id', products_controller.update);
products.delete('/:product_id', products_controller.del);
products.post('/', products_controller.create);
