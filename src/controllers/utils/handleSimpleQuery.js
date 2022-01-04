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