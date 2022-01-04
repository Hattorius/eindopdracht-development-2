import { handleSimpleQuery } from "./utils/handleSimpleQuery.js";
import { require } from "./utils/require.js";
import { error } from "./utils/returnError.js";
import { validateEmail } from "./utils/validateEmail.js";

export const read = async(req, res) => {
    // Receive and show users
    // if me is set, url will contain 'me' (check req.path)
    var users;
    if (req.path.includes('me')) {
        users = await req.database.users.read('me');
    } else {
        users = await req.database.users.read();
    }

    if (typeof users === 'undefined') {
        users = null;
    } else if (typeof users.length === 'undefined') {
        users = [users];
    }

    if (req.database.users.error !== null) {
        return res.json({
            'error': true,
            'message': 'Something went wrong with getting users',
            'databaseError': req.database.users.error
        });
    }

    res.json({
        'error': false,
        'users': users
    });
}

export const create = async(req, res) => {
    // Create user
    if (!require(req.body.username, res, "Username")) return;
    if (!require(req.body.email, res, "Email")) return;
    if (!require(req.body.password, res, "Password")) return;
    if (!validateEmail(req.body.email)) return error(res, "Email is invalid.");

    return handleSimpleQuery(
        res,
        req.database.users,
        await req.database.users.create(req.body),
        'creating user'
    );
}

export const update = async(req, res) => {
    // Update user, user id can be found in req.params.user_id
}