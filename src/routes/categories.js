
import express from 'express';
export const categories = express.Router();

import * as categories_controller from '../controllers/categories.js';
import * as products_controller from '../controllers/products.js';

categories.get('/', categories_controller.read);
categories.get('/:category_id', categories_controller.read);
categories.post('/', categories_controller.create);
categories.patch('/:category_id', categories_controller.update);
categories.delete('/:category_id', categories_controller.del);
categories.get('/:category_id/products', products_controller.read);
