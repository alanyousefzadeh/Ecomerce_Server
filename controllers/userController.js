// controllers/userController.js
const UserModel = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.getAllUsers = (req, res) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    if(page && limit){
        UserModel.pagination(page,limit,(err, result) => {
            if (err) {
                return res.status(500).send('Database query error');
            }
            res.json(result);
        });
    }else{
        UserModel.getAll((err, results) => {
            if (err) {
                return res.status(500).send('Database query error');
            }
            res.json(results);
        });
    }
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

exports.createUser = (req, res) => {
    const { Email, Password, Address,Phone } = req.body;

    const isValidPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    const isValidEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const isValidPhone =/^\d{10}$/;
    if (!Email || !Password || !Address || !Phone) {
        return res.status(400).send('Please fill all the required fields');
    }
    if(!Email.match(isValidEmail)){
        return res.status(400).send('Invalid Email');
    }
    if(!Password.match(isValidPassword)){
        return res.status(400).send('Invalid Password');
    }
    if(!String(Phone).match(isValidPhone)){
        return res.status(400).send('Invalid Phone');
    }
    UserModel.create({Email, Password, Address,Phone}, (err, result) => {
        if (err) {
            return res.status(500).send('Database query error');
        }
        res.status(201).json({ id: result.insertId, Email,Password,Address,Phone });
    }
    );
}

exports.updateUser = (req, res) => {
    const userId = req.params.id;
    const { Email, Password, Address,Phone } = req.body;
    const isValidPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    const isValidEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const isValidPhone =/^\d{10}$/;
    if (!Email || !Password || !Address || !Phone) {
        return res.status(400).send('Please fill all the required fields');
    }
    if(!Email.match(isValidEmail)){
        return res.status(400).send('Invalid Email');
    }
    if(!Password.match(isValidPassword)){
        return res.status(400).send('Invalid Password');
    }
    if(!String(Phone).match(isValidPhone)){
        return res.status(400).send('Invalid Phone');
    }
    UserModel.update(userId, {Email, Password, Address,Phone}, (err, result) => {
        if (err) {
            return res.status(500).send('Database query error');
        }
        res.send('User updated');
    });
}

exports.deleteUser = (req, res) => {
    const userId = req.params.id;
    UserModel.delete(userId, (err, result) => {
        if (err) {
            return res.status(500).send('Database query error');
        }
        res.send('User deleted');
    });
}


