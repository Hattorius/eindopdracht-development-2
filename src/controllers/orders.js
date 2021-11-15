
export const read = (req, res) => {
    // Receive and show orders
    // if order id is set, you'll find it in req.params.order_id
    // if user if is set, you'll find it in req.params.user_id
    res.send('hi');
}

export const create = (req, res) => {
    // Create order
}

export const update = (req, res) => {
    // Update order, order id can be found in req.params.order_id
}
