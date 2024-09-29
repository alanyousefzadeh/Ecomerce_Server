// models/UserModel.js
const BaseModel = require('./BaseModel');
const db = require('../db/connection');

class LoginModel extends BaseModel {
    constructor() {
        super('user', db);
    }

    updateEmail(id, Email, callback) {
        const query = `UPDATE ${this.tableName} SET Email = ? WHERE id = ?`;
        this.db.query(query, [Email,id], callback);
    }
}

module.exports = new LoginModel();
