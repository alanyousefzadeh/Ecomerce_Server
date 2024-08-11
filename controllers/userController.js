// controllers/userController.js
const UserModel = require('../models/UserModel');

exports.getAllUsers = (req, res) => {
    UserModel.getAll((err, results) => {
        if (err) {
            return res.status(500).send('Database query error');
        }
        res.json(results);
    });
};

exports.getUserById = (req, res) => {
    const userId = req.params.id;
    UserModel.getById(userId, (err, result) => {
        if (err) {
            return res.status(500).send('Database query error');
        }
        res.json(result);
    });
};
