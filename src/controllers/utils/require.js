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

export const handleSimpleQuery = (res, table, failed, task) => {
    if (failed) {
        res.json({
            'error': false
        });
    } else {
        res.json({
            'error': true,
            'message': 'Something went wrong with ' + task,
            'databaseError': table.error
        });
    }
}