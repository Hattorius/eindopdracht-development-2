import { handleSimpleQuery } from "./utils/handleSimpleQuery.js";
import { require } from "./utils/require.js";
import { error } from "./utils/returnError.js";

export const read = async(req, res) => {
    // Receive and show categories
    // if category id is set, you'll find it in req.params.category_id
    var categories;
    if (typeof req.params.category_id === 'undefined') {
        categories = await req.database.categories.read();
    } else {
        categories = await req.database.categories.read(req.params.category_id);
        if (typeof categories !== 'undefined') {
            categories = [categories];
        } else {
            categories = null;
        }
    }
    if (req.database.categories.error !== null) {
        res.status(500);
        return res.json({
            'error': true,
            'message': 'Something went wrong with getting categories',
            'databaseError': req.database.categories.error
        });
    }

    res.status(200);
    res.json({
        'error': false,
        'categories': categories
    });
}

export const create = async(req, res) => {
    // Create category
    if (!req.auth.isadmin()) {
        res.status(401);
        return error(res, "Not admin!")
    }
    res.status(400);
    if (!require(req.body.name, res, "Category name")) return;

    return handleSimpleQuery(
        res,
        req.database.categories,
        await req.database.categories.create(req.body.name),
        "creating category"
    );
}

export const update = async(req, res) => {
    // Update category, category id can be found in req.params.category_id and name at req.body.name
    if (!req.auth.isadmin()) {
        res.status(401);
        return error(res, "Not admin!")
    }
    res.status(400);
    if (!require(req.params.category_id, res, "Category id")) return;
    if (!require(req.body.name, res, "Category name")) return;

    return handleSimpleQuery(
        res,
        req.database.categories,
        await req.database.categories.update(req.params.category_id, req.body.name),
        "updating category"
    );
}

export const del = async(req, res) => {
    // Delete category, category id can be found in req.params.category_id
    if (!req.auth.isadmin()) {
        res.status(401);
        return error(res, "Not admin!")
    }
    res.status(400);
    if (!require(req.params.category_id, res, "Category id")) return;

    return handleSimpleQuery(
        res,
        req.database.categories,
        await req.database.categories.delete(req.params.category_id),
        "deleting category"
    );
}