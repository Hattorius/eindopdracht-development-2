
export const read = (req, res) => {
    // Receive and show users
    // if me is set, url will contain 'me' (check req.path)
    res.send('hi');
}

export const create = (req, res) => {
    // Create user
}

export const update = (req, res) => {
    // Update user, user id can be found in req.params.user_id
}
