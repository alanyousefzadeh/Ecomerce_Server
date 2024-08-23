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

exports.register = (req, res) => {
    const { Email, Password, Address,Phone } = req.body;
        if (!Email || !Password || !Address || !Phone) {
            return res.status(400).send('Please fill all the required fields');
        }
        //hash password
        bcrypt.hash(Password, 10, (err, hash) => {
            console.log('Hashed password:', hash); // Debugging log
                if (err) {
                    return res.status(500).send('Hashing error');
                }
                UserModel.register({Email, Password:hash ,Address, Phone}, (err, result) => {
                    if (err) {
                        return res.status(500).send('Database query error');
                    }
                    res.status(201).json({id: result.insertId, Email, Password, Address, Phone});
                });
            }
        );
}

exports.login = (req, res) => {
    console.log('Request received at /register'); // Debugging log
    const {Email, Password} = req.body;
    console.log('Received data:', Email, Password); // Debugging log

    if (!Email || !Password) {
        return res.status(400).send('Please fill all the required fields');
    }
    UserModel.login({Email}, (err, results) => {
    if(err){
        return res.status(500).send('Database query error');
    }
    if (results.length === 0) return res.status(401).json({ message: 'Invalid credentials' });

    const user = results[0];
    const JWT = "your_jwt_secret"
    bcrypt.compare(Password, user.Password, (err, isMatch) => {
        console.log('Password', Password); // Debugging log
        console.log('Hashed password', user.Password); // Debugging log
        if (err) {
            return res.status(500).send('Hashing error');
        }
        if (!isMatch) {
            return res.status(401).json({message: 'Invalid credentials'});
        }
        const token = jwt.sign({ id: user.id, Email: user.Email } , JWT, {
            expiresIn: '1h'
        });
        console.log('Token:', token); // Debugging log
        res.json({ token });
}
);
}
);
}

