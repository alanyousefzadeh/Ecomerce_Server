// models/UserModel.js
const BaseModel = require('./BaseModel');
const db = require('../db/connection');

class RegisterModel extends BaseModel {
    constructor() {
        super('user', db);
    }

    // Add any user-specific methods here
}

module.exports = new RegisterModel();
