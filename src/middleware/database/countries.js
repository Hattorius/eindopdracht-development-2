export class countries {

    constructor(database) {
        this.database = database;
        this.error;
    }

    async read(id = null) {
        if (id === null) {
            return await new Promise((resolve) => {
                this.database.all("SELECT * FROM 'countries'", [], (err, rows) => {
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
            this.database.get("SELECT * FROM 'countries' WHERE id=?", id, (err, row) => {
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

    async create(name) {
        return await this.simpleQuery("INSERT INTO 'countries' (name) VALUES (?)", name);
    }

    async delete(id) {
        return await this.simpleQuery("DELETE FROM 'countries' WHERE id=?", id);
    }

    async update(id, name) {
        return await this.simpleQuery("UPDATE 'countries' SET name=$name WHERE id=$id", {
            $id: id,
            $name: name
        });
    }

}