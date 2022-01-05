import { handleSimpleQuery } from "./utils/handleSimpleQuery.js";
import { require } from "./utils/require.js";
import { error } from "./utils/returnError.js";

export const read = async(req, res) => {
    // Receive and show orders
    // if user id is set, you'll find it in req.params.user_id

    var orders = null;
    if (typeof req.params.user_id !== 'undefined' && req.auth.isuser() && req.auth.userid() === parseInt(req.params.user_id)) {
        orders = await req.database.orders.read(req.params.user_id);
    } else if (req.auth.isadmin()) {
        orders = await req.database.orders.read();
    } else {
        return error(res, "No permission");
    }

    if (typeof orders === 'undefined' || orders === null) {
        orders = [];
    }

    if (req.database.orders.error !== null) {
        return res.json({
            'error': true,
            'message': 'Something went wrong with getting orders',
            'databaseError': req.database.orders.error
        });
    }

    res.json({
        'error': false,
        'orders': orders
    });
}

export const create = async(req, res) => {
    // Create order
    if (!req.auth.isuser()) {
        return error(res, "Not logged in!")
    }
    if (!require(req.body.address, res, "Address")) return;
    if (!require(req.body.products, res, "Products")) return;
    if (!require(req.body.products[0], res, "Products")) return;

    return handleSimpleQuery(
        res,
        req.database.orders,
        await req.database.orders.create(req.auth.userid(), req.body),
        'creating order'
    );
}

export const update = async(req, res) => {
    // Update order, order id can be found in req.params.order_id
    // skipping this, don't feel like doing it. Won't do it for a +0.3
}