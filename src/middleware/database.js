import sqlite3 from "sqlite3";

import { categories } from "./database/categories.js";
import { countries } from "./database/countries.js";
import { products } from "./database/products.js";

const db = new sqlite3.Database('database.db');

const databaseCreation = () => {
    db.serialize(() => {
        db.run(`
            CREATE TABLE IF NOT EXISTS "categories" (
                "id"	INTEGER NOT NULL UNIQUE,
                "name"	TEXT NOT NULL UNIQUE,
                PRIMARY KEY("id" AUTOINCREMENT)
            );
        `);

        db.run(`
            CREATE TABLE IF NOT EXISTS "products" (
                "id"	INTEGER NOT NULL UNIQUE,
                "article_number"	TEXT NOT NULL UNIQUE,
                "category_id"	INTEGER DEFAULT null,
                "name"	TEXT NOT NULL,
                "description"	TEXT,
                "price"	INTEGER NOT NULL,
                "date_added"	INTEGER NOT NULL,
                "supplier"	TEXT NOT NULL,
                "inventory"	INTEGER DEFAULT 0,
                FOREIGN KEY("category_id") REFERENCES "categories"("id"),
                PRIMARY KEY("id" AUTOINCREMENT)
            );
        `);

        db.run(`
            CREATE TABLE IF NOT EXISTS "countries" (
                "id"	INTEGER NOT NULL UNIQUE,
                "name"	TEXT NOT NULL UNIQUE,
                PRIMARY KEY("id" AUTOINCREMENT)
            );
        `);

        db.run(`
            CREATE TABLE IF NOT EXISTS "users" (
                "id"	INTEGER NOT NULL UNIQUE,
                "username"	TEXT NOT NULL UNIQUE,
                "email"	TEXT NOT NULL UNIQUE,
                "password"	TEXT NOT NULL,
                "administrator"	INTEGER NOT NULL DEFAULT 0,
                PRIMARY KEY("id" AUTOINCREMENT)
            );
        `);

        db.run(`
            CREATE TABLE IF NOT EXISTS "orders" (
                "id"	INTEGER NOT NULL UNIQUE,
                "user_id"	INTEGER NOT NULL,
                "address"	TEXT NOT NULL,
                "status"	TEXT NOT NULL DEFAULT 'RECEIVED',
                FOREIGN KEY("user_id") REFERENCES "users"("id"),
                PRIMARY KEY("id" AUTOINCREMENT)
            );
        `);

        db.run(`
            CREATE TABLE IF NOT EXISTS "order_products" (
                "order_id"	INTEGER NOT NULL,
                "product_id"	INTEGER NOT NULL,
                "quantity"  INTEGER NOT NULL DEFAULT 1,
                FOREIGN KEY("order_id") REFERENCES "orders"("id"),
                FOREIGN KEY("product_id") REFERENCES "products"("id")
            );
        `);
    });
}

var created = false;
const getDatabaseConnection = () => {
    if (!created) {
        databaseCreation();
    }
    return db;
}

export const database = (req, res, next) => {
    // Make database connection
    const database = getDatabaseConnection();

    req.rawDatabase = database;
    req.database = {
        categories: new categories(database),
        countries: new countries(database),
        products: new products(database)
    };

    // Continue
    next();
}