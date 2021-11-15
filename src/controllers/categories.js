
export const read = (req, res) => {
    // Receive and show categories
    // if category id is set, you'll find it in req.params.category_id
    res.send('hi');
}

export const create = (req, res) => {
    // Create category
}

export const update = (req, res) => {
    // Update category, category id can be found in req.params.category_id
}

export const del = (req, res) => {
    // Delete category, category id can be found in req.params.category_id
}
