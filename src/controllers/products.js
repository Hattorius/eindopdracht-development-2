
export const read = (req, res) => {
    // Receive and show products
    // if product id is set, you'll find it in req.params.product_id
    // if category id is set, you'll find it in req.params.category_id
    // if search query is set, you'll find it in req.query.q
    res.send('hi');
}

export const create = (req, res) => {
    // Create product
}

export const update = (req, res) => {
    // Update product, product id can be found in req.params.product_id
}

export const del = (req, res) => {
    // Delete product, product id can be found in req.params.product_id
}
