import { handleSimpleQuery } from "./utils/handleSimpleQuery.js";
import { require } from "./utils/require.js";

export const read = async(req, res) => {
    // Receive and show products
    // if product id is set, you'll find it in req.params.product_id
    // if category id is set, you'll find it in req.params.category_id
    // if search query is set, you'll find it in req.query.q

    if (typeof req.params.product_id === 'undefined') req.params.product_id = null;
    if (typeof req.params.category_id === 'undefined') req.params.category_id = null;
    if (typeof req.query.q === 'undefined') req.query.q = null;

    var products = await req.database.products.read(
        req.params.product_id,
        req.params.category_id,
        req.query.q
    );

    if (typeof products === 'undefined') {
        products = null;
    } else if (typeof products.length === 'undefined') {
        products = [products];
    }

    if (req.database.products.error !== null) {
        return res.json({
            'error': true,
            'message': 'Something went wrong with getting products',
            'databaseError': req.database.products.error
        });
    }

    res.json({
        'error': false,
        'products': products
    });
}

export const create = async(req, res) => {
    // Create product
    if (!require(req.body.article_number, res, "Article number")) return;
    if (!require(req.body.category_id, res, "Category id")) return;
    if (!require(req.body.name, res, "Product name")) return;
    if (!require(req.body.description, res, "Product description")) return;
    if (!require(req.body.price, res, "Price")) return;
    if (!require(req.body.supplier, res, "Supplier name")) return;
    if (!require(req.body.inventory, res, "Inventory amount")) return;

    return handleSimpleQuery(
        res,
        req.database.products,
        await req.database.products.create(req.body),
        'creating product'
    );
}

export const update = async(req, res) => {
    // Update product, product id can be found in req.params.product_id
    if (!require(req.params.product_id, res, "Product id")) return;

    return handleSimpleQuery(
        res,
        req.database.products,
        await req.database.products.update(req.params.product_id, req.body),
        'updating product'
    );
}

export const del = async(req, res) => {
    // Delete product, product id can be found in req.params.product_id
    if (!require(req.params.product_id, res, "Product id")) return;

    return handleSimpleQuery(
        res,
        req.database.products,
        await req.database.products.delete(req.params.product_id),
        "deleting country"
    );
}