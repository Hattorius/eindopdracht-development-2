export class table {

    constructor(database) {
        this.database = database;
        this.error;
    }

    async read(id = null) {
        if (id === null) {
            const rows = await new Promise((resolve) => {
                this.database.all("SELECT * FROM 'categories'", [], (err, rows) => {
                    if (err !== null) {
                        this.error = err;
                        resolve([]);
                    }
                    this.error = null;
                    resolve(rows);
                });
            });
            return rows;
        }
        return this.database.get("SELECT * FROM 'categories' WHERE id=?", id);
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
        return await this.simpleQuery("INSERT INTO 'categories' (name) VALUES (?)", name);
    }

    async delete(id) {
        return await this.simpleQuery("DELETE FROM 'categories' WHERE id=?", id);
    }

    async update(id, name) {
        return await this.simpleQuery("UPDATE 'categories' SET name=$name WHERE id=$id", {
            $id: id,
            $name: name
        });
    }

}