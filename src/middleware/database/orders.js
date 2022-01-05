const createOrderOutsideOfClassCusSomehowSomeoneChoseToMakeItAnnoyingToUseThisVariableWithinAFunctionCallbackAndThatOverlappingWithTheClassAndSoNotWorkingSorryForTheLongVariableNameBtw = async(database, sql, params) => {
    return await new Promise((resolve) => {
        database.run(sql, params, function(err) {
            if (err) {
                resolve(0);
            }
            resolve(this.lastID); // I can't use this in the callback if it's in a class (that's what the function name is about)
        });
    });
}

export class orders {

    constructor(database) {
        this.database = database;
        this.error;
    }

    async readProducts(orderid) {
        return await new Promise((resolve) => {
            this.database.all("SELECT * FROM 'order_products' WHERE order_id=?", [orderid], (err, rows) => {
                if (err !== null) {
                    this.error = err;
                    resolve([]);
                }
                this.error = null;
                resolve(rows);
            });
        });
    }

    async read(userid = null) {

        if (userid === null) {
            return await new Promise((resolve) => {
                this.database.all("SELECT * FROM 'orders'", [], (err, rows) => {
                    if (err !== null) {
                        this.error = err;
                        resolve([]);
                    }
                    this.error = null;
                    resolve(rows);
                });
            });
        }

        return await new Promise((resolve) => {
            this.database.all("SELECT * FROM 'orders' WHERE user_id=?", userid, (err, rows) => {
                if (err !== null) {
                    this.error = err;
                    resolve([]);
                }
                this.error = null;
                resolve(rows);
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

    async create(user_id, options) {
        var products = [];
        for (var i = 0; i < options.products.length; i++) {
            const product = options.products[i];
            if (typeof product.id !== 'undefined' && typeof product.quantity !== 'undefined') {
                products.push(product);
            }
        }

        if (products.length < 1) {
            this.error = "Not enough products or wrong format.";
            return false;
        }

        const order_id = await createOrderOutsideOfClassCusSomehowSomeoneChoseToMakeItAnnoyingToUseThisVariableWithinAFunctionCallbackAndThatOverlappingWithTheClassAndSoNotWorkingSorryForTheLongVariableNameBtw(this.database, "INSERT INTO 'orders' (user_id, address) VALUES (?, ?)", [
            user_id,
            options.address
        ]);

        if (typeof order_id !== "number" || order_id < 1) {
            return false;
        }

        for (var i = 0; i < products.length; i++) {
            await this.simpleQuery("INSERT INTO 'order_products' (order_id, product_id, quantity) VALUES (?, ?, ?)", [order_id, products[i].id, products[i].quantity]);
        }

        this.error = null;
        return true;
    }

    async delete(id) {
        return await this.simpleQuery("DELETE FROM 'orders' WHERE id=?", id);
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

        return await this.simpleQuery("UPDATE 'orders' SET " + query + " WHERE id=?", [...values, id]);
    }

}