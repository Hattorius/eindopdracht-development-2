import { handleSimpleQuery } from "./utils/handleSimpleQuery.js";
import { require } from "./utils/require.js";

export const read = async(req, res) => {
    // Receive and show countries
    // if country id is set, you'll find it in req.params.country_id
    var countries;
    if (typeof req.params.country_id === 'undefined') {
        countries = await req.database.countries.read();
    } else {
        countries = await req.database.countries.read(req.params.country_id);
        if (typeof countries !== 'undefined') {
            countries = [countries];
        } else {
            countries = null;
        }
    }

    if (req.database.countries.error !== null) {
        return res.json({
            'error': true,
            'message': 'Something went wrong with getting countries',
            'databaseError': req.database.countries.error
        });
    }

    res.json({
        'error': false,
        'countries': countries
    });
}

export const create = async(req, res) => {
    // Create country
    if (!req.auth.isadmin()) {
        return error(res, "Not admin!")
    }
    if (!require(req.body.name, res, "Country name")) return;

    return handleSimpleQuery(
        res,
        req.database.countries,
        await req.database.countries.create(req.body.name),
        "creating country"
    );
}

export const update = async(req, res) => {
    // Update country, country id can be found in req.params.country_id and name at req.body.name
    if (!req.auth.isadmin()) {
        return error(res, "Not admin!")
    }
    if (!require(req.params.country_id, res, "Country id")) return;
    if (!require(req.body.name, res, "Country name")) return;

    return handleSimpleQuery(
        res,
        req.database.countries,
        await req.database.countries.update(req.params.country_id, req.body.name),
        "updating country"
    );
}

export const del = async(req, res) => {
    // Delete country, country id can be found in req.params.country_id
    if (!req.auth.isadmin()) {
        return error(res, "Not admin!")
    }
    if (!require(req.params.country_id, res, "Country id")) return;

    return handleSimpleQuery(
        res,
        req.database.countries,
        await req.database.countries.delete(req.params.country_id),
        "deleting country"
    );
}