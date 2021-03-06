import { config } from 'dotenv';
config();
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

// we use json because we're modern like that
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.options('*', cors());

// Import routes
import { categories } from './routes/categories.js';
import { products } from './routes/products.js';
import { countries } from './routes/countries.js';
import { orders } from './routes/orders.js';
import { users } from './routes/users.js';
import { auth } from './routes/auth.js';

// Import middleware
import { session } from './middleware/session.js';
app.use(session);
import { database } from './middleware/database.js';
app.use(database);

// Routing here
app.use('/api/categories', categories);
app.use('/api/products', products);
app.use('/api/countries', countries);
app.use('/api/orders', orders);
app.use('/api/users', users);
app.use('/api/auth', auth);

// Start server
app.listen(8080, () => {
    console.log("Server started on :8080")
});