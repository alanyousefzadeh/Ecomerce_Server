// models/UserModel.js
const BaseModel = require('./BaseModel');
const db = require('../db/connection');

class ProductModel extends BaseModel {
    constructor() {
        super('product', db);
    }

    // Add any user-specific methods here
}

module.exports = new ProductModel();
