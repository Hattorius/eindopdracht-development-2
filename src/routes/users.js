
import express from 'express';
export const users = express.Router();

import * as users_controller from '../controllers/users.js';
import * as orders_controller from '../controllers/orders.js';

users.get('/', users_controller.read);
users.get('/me', users_controller.read);
users.post('/', users_controller.create);
users.patch('/:user_id', users_controller.update);
users.get('/:user_id/orders', orders_controller.read);
