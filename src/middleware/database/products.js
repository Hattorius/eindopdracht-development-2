export class products {

    constructor(database) {
        this.database = database;
        this.error;
    }

    async read(id = null, category_id = null, searchQuery = null) {
        if (id === null && searchQuery === null && category_id === null) {
            return await new Promise((resolve) => {
                this.database.all("SELECT * FROM 'products'", [], (err, rows) => {
                    if (err !== null) {
                        this.error = err;
                        resolve([]);
                    }
                    this.error = null;
                    resolve(rows);
                });
            });
        }

        if (id !== null) {
            return await new Promise((resolve) => {
                this.database.get("SELECT * FROM 'products' WHERE id=?", id, (err, row) => {
                    if (err !== null) {
                        this.error = err;
                        resolve([]);
                    }
                    this.error = null;
                    resolve(row);
                });
            });
        }

        if (category_id !== null) {
            return await new Promise((resolve) => {
                this.database.get("SELECT * FROM 'products' WHERE category_id=?", category_id, (err, row) => {
                    if (err !== null) {
                        this.error = err;
                        resolve([]);
                    }
                    this.error = null;
                    resolve(row);
                });
            });
        }

        return await new Promise((resolve) => {
            this.database.get("SELECT * FROM 'products' WHERE name LIKE '%' || ? || '%'", searchQuery, (err, row) => {
                if (err !== null) {
                    this.error = err;
                    resolve([]);
                }
                this.error = null;
                resolve(row);
            });
        });
    }

    async simpleQuery(sql, params) {
        const error = await new Promise((resolve) => {
            this.database.run(sql, params, (err) => {
                resolve(err);
            });
        });

        if (error === null) {
            this.error = null;
            return true;
        }

        this.error = error;
        return false;
    }

    async create(options) {
        return await this.simpleQuery("INSERT INTO 'products' (article_number, category_id, name, description, price, date_added, supplier, inventory) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [
            options.article_number,
            parseInt(options.category_id),
            options.name,
            options.description,
            parseInt(options.price),
            parseInt(new Date().getTime() / 1000),
            options.supplier,
            parseInt(options.inventory)
        ]);
    }

    async delete(id) {
        return await this.simpleQuery("DELETE FROM 'products' WHERE id=?", id);
    }

    async update(id, data) {
        const dataKeys = Object.keys(data);
        var names = [];
        var values = [];
        var options = ["article_number", "category_id", "name", "description", "price", "supplier", "inventory"];
        for (var i = 0; i < dataKeys.length; i++) {
            if (options.includes(dataKeys[i])) {
                names.push(dataKeys[i]);
                values.push(data[dataKeys[i]]);
            }
        }
        if (values.length < 1) return true;
        const query = names.join('=?, ') + '=?';

        return await this.simpleQuery("UPDATE 'products' SET " + query + " WHERE id=?", [...values, id]);
    }

}