export const error = (res, message) => {
    res.json({
        'error': true,
        'message': message
    });
}