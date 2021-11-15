
import express from 'express';
export const countries = express.Router();

import * as countries_controller from '../controllers/countries.js';

countries.get('/', countries_controller.read);
countries.post('/', countries_controller.create);
countries.get('/:country_id', countries_controller.read);
countries.patch('/:country_id', countries_controller.update);
countries.delete('/:country_id', countries_controller.del);
