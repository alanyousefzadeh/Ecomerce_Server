// models/BaseModel.js
class BaseModel {
    constructor(tableName, db) {
        this.tableName = tableName;
        this.db = db;
    }

    getAll(callback) {
        this.db.query(`SELECT * FROM ${this.tableName}`, callback);
    }

    getById(id, callback) {
        this.db.query(`SELECT * FROM ${this.tableName} WHERE id = ?`, [id], callback);
    }

    create(data, callback) {
        this.db.query(`INSERT INTO ${this.tableName} SET ?`, data, callback);
    }

    update(id, data, callback) {
        this.db.query(`UPDATE ${this.tableName} SET ? WHERE id = ?`, [data, id], callback);
    }

    delete(id, callback) {
        this.db.query(`DELETE FROM ${this.tableName} WHERE id = ?`, [id], callback);
    }
}

module.exports = BaseModel;
