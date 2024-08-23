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

    pagination(page,limit,callback){
        const offset = (page - 1) * limit;
        this.db.query(`SELECT * FROM ${this.tableName} LIMIT ? OFFSET ?`, [limit, offset], callback);
    }

    login(data, callback){
        this.db.query(`SELECT * FROM ${this.tableName} WHERE Email = ? `, [data.Email], callback);
    }
    register(data, callback){
        this.db.query(`INSERT INTO ${this.tableName} SET ?`, data, callback);
    }
}

module.exports = BaseModel;
