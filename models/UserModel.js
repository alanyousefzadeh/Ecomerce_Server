// models/UserModel.js
const BaseModel = require('./BaseModel');
const db = require('../db/connection');

class UserModel extends BaseModel {
    constructor() {
        super('user', db);
    }
}

module.exports = new UserModel();
