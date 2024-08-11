const express = require('express');
const router = express.Router();
const connection = require('../db/connection');

// Get all users
router.get('/', (req, res) => {
    const query = 'SELECT * FROM product';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching users:', err);
            res.status(500).send('Server error');
            return;
        }
        res.json(results);
    });
});

// Get user by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM product WHERE id = ?';
    connection.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error fetching user:', err);
            res.status(500).send('Server error');
            return;
        }
        res.json(results[0]);
    });
});

// Create new user
router.post('/', (req, res) => {
    const { Name,Price,Stock,Category,Gender,Size } = req.body;
    const query = 'INSERT INTO product (name,price,stock,category,gender,size) VALUES (?,?,?,?,?,?)';
    connection.query(query, [Name,Price,Stock,Category,Gender,Size], (err, results) => {
        if (err) {
            console.error('Error creating user:', err);
            res.status(500).send('Server error');
            return;
        }
        res.status(201).json({ id: results.insertId,Name,Price,Stock,Category,Gender,Size});
    });
});

// Update user
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { Name,Price,Stock,Category,Gender,Size } = req.body;
    const query = 'UPDATE user SET Name = ? ,Price = ? ,Stock = ?,Category = ?,Gender = ? ,Size = ? WHERE id = ?';
    connection.query(query, [Name,Price,Stock,Category,Gender,Size,id], (err, results) => {
        if (err) {
            console.error('Error updating user:', err);
            res.status(500).send('Server error');
            return;
        }
        res.send('User updated');
    });
});

// Delete user
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM product WHERE id = ?';
    connection.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error deleting user:', err);
            res.status(500).send('Server error');
            return;
        }
        res.send('User deleted');
    });
});
module.exports = router;
