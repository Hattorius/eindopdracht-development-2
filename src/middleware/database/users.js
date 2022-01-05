import crypto from "crypto";

export class users {

    constructor(database) {
        this.database = database;
        this.error;
    }

    async read(id = null, username = null) {
        if (id === null && username === null) {
            return await new Promise((resolve) => {
                this.database.all("SELECT * FROM 'users'", [], (err, rows) => {
                    if (err !== null) {
                        this.error = err;
                        resolve([]);
                    }
                    this.error = null;
                    resolve(rows);
                });
            });
        }

        if (username !== null) {
            return await new Promise((resolve) => {
                this.database.get("SELECT * FROM 'users' WHERE username=?", username.toLowerCase(), (err, row) => {
                    if (err !== null) {
                        this.error = err;
                        resolve(null);
                    }
                    this.error = null;
                    resolve(row);
                });
            });
        }

        return await new Promise((resolve) => {
            this.database.get("SELECT * FROM 'users' WHERE id=?", id, (err, row) => {
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
        const md5sum = crypto.createHash('md5');
        return await this.simpleQuery("INSERT INTO 'users' (username, email, password) VALUES (?, ?, ?)", [
            options.username.toLowerCase(),
            options.email,
            md5sum.update(options.password).digest('hex')
        ]);
    }

    async update(id, data) {
        const dataKeys = Object.keys(data);
        var names = [];
        var values = [];
        var options = ["username", "email", "password", "administrator"];
        for (var i = 0; i < dataKeys.length; i++) {
            if (options.includes(dataKeys[i])) {
                names.push(dataKeys[i]);
                values.push(data[dataKeys[i]]);
            }
        }
        if (values.length < 1) return true;
        const query = names.join('=?, ') + '=?';

        return await this.simpleQuery("UPDATE 'users' SET " + query + " WHERE id=?", [...values, id]);
    }

}