
import express from 'express';
export const auth = express.Router();

import * as auth_controller from '../controllers/auth.js';

auth.post('/', auth_controller.authenticate);
