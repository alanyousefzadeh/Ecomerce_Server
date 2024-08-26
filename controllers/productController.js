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


// // Create new user
// router.post('/', (req, res) => {
//     const { Name,Price,Stock,Category,Gender,Size } = req.body;
//     const query = 'INSERT INTO product (name,price,stock,category,gender,size) VALUES (?,?,?,?,?,?)';
//     connection.query(query, [Name,Price,Stock,Category,Gender,Size], (err, results) => {
//         if (err) {
//             console.error('Error creating user:', err);
//             res.status(500).send('Server error');
//             return;
//         }
//         res.status(201).json({ id: results.insertId,Name,Price,Stock,Category,Gender,Size});
//     });
// });
//
// // Update user
// router.put('/:id', (req, res) => {
//     const { id } = req.params;
//     const { Name,Price,Stock,Category,Gender,Size } = req.body;
//     const query = 'UPDATE user SET Name = ? ,Price = ? ,Stock = ?,Category = ?,Gender = ? ,Size = ? WHERE id = ?';
//     connection.query(query, [Name,Price,Stock,Category,Gender,Size,id], (err, results) => {
//         if (err) {
//             console.error('Error updating user:', err);
//             res.status(500).send('Server error');
//             return;
//         }
//         res.send('User updated');
//     });
// });
//
// // Delete user
// router.delete('/:id', (req, res) => {
//     const { id } = req.params;
//     const query = 'DELETE FROM product WHERE id = ?';
//     connection.query(query, [id], (err, results) => {
//         if (err) {
//             console.error('Error deleting user:', err);
//             res.status(500).send('Server error');
//             return;
//         }
//         res.send('User deleted');
//     });
// });




