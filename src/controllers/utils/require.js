export const require = (data, res, name) => {
    if (typeof data === 'undefined') {
        res.json({
            'error': true,
            'message': name + ' is not defined.'
        });
        return false
    }
    return true;
}