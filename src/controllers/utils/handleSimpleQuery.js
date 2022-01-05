export const handleSimpleQuery = (res, table, failed, task) => {
    if (failed) {
        res.status(201);
        res.json({
            'error': false
        });
    } else {
        res.status(500);
        res.json({
            'error': true,
            'message': 'Something went wrong with ' + task,
            'databaseError': table.error
        });
    }
}