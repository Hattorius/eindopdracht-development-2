
export const read = (req, res) => {
    // Receive and show countries
    // if country id is set, you'll find it in req.params.country_id
    res.send('hi');
}

export const create = (req, res) => {
    // Create country
}

export const update = (req, res) => {
    // Update country, country id can be found in req.params.country_id
}

export const del = (req, res) => {
    // Delete country, country id can be found in req.params.country_id
}
