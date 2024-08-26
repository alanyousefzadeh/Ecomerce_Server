const ProductModel = require('../models/ProductModel');
const { validationResult } = require('express-validator');

exports.getAllProducts =  (req, res) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    if(page && limit){
        ProductModel.pagination(page,limit,(err, result) => {
            if (err) {
                return res.status(500).send('Database query error');
            }
            res.json(result);
        });
    }else{
        ProductModel.getAll((err, results) => {
            if (err) {
                return res.status(500).send('Database query error');
            }
            res.json(results);
        });
    }
}


// Get Product by ID
exports.getProductById =  (req, res) => {
    const { id } = req.params;
    ProductModel.getById( id, (err, result) => {
        if (err) {
            return res.status(500).send('Database query error');
        }
        res.json(result);
    });
}


//  Create new Product
exports.createProduct = (req, res) => {
    const {Name, Price, Stock, Category, Gender, Size} = req.body;
    ProductModel.create( {Name, Price, Stock, Category, Gender, Size}, (err, results) => {
        if (err) {
            console.error('Error creating user:', err);
            res.status(500).send('Server error');
            return;
        }
        res.status(201).json({id: results.insertId, Name, Price, Stock, Category, Gender, Size});
    });
}


 // Update Product
exports.updateProduct = (req, res) => {
    const userId = req.params.id;
    const { Name,Price,Stock,Category,Gender,Size } = req.body;
    ProductModel.update(userId,{Name,Price,Stock,Category,Gender,Size}, (err, results) => {
        if (err) {
            console.error('Error updating user:', err);
            res.status(500).send('Server error');
            return;
        }
        res.send('User updated');
    });
}


// Delete user
exports.deleteProduct =  (req, res) => {
    const { id } = req.params;
    ProductModel.delete(id, (err, results) => {
        if (err) {
            console.error('Error deleting user:', err);
            res.status(500).send('Server error');
            return;
        }
        res.send('User deleted');
    });
}




