// controllers/userController.js
const UserModel = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {userFieldsValidation} = require("./helperFunctions");
const nodemailer = require('nodemailer');
const secretKey = 'your-secret-key';  // Replace with your secret
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

exports.getUserByEmail = (req, res) => {
    const Email = req.params.Email;
    UserModel.getByEmail(Email, (err, result) => {
        if (err) {
            return res.status(500).send('Database query error');
        }
        res.json(result);
    });
}

exports.createUser = (req, res) => {
    const { Email, Password, Address,Phone } = req.body;
    userFieldsValidation(req, res,Email,Password,Address,Phone);
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
    userFieldsValidation(req, res,Email,Password,Address,Phone);
    UserModel.update(userId, {Email, Password, Address,Phone}, (err, result) => {
        if (err) {
            return res.status(500).send('Database query error');
        }
        res.send('User updated');
    });
}

exports.updateEmail = (req, res) => {
    const userId = req.params.id;
    const { Email } = req.body;
    UserModel.updateEmail(userId, { Email }, (err, result) => {
        if (err) {
            return res.status(500).send('Database query error');
        }
        res.send('Email updated');
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

exports.changeEmail = (req, res) => {

    const { userId } = req.body;
   // const {token} = req.headers.authorization
    console.log("user ID" ,userId)
    // Create a token with the user ID
    const tokenId= jwt.sign({ id: userId }, process.env.JWT, { expiresIn: '1h' });  // Token expires in 1 hour

    // Construct the URL with the token
    const url = `http://localhost:3000/change-email/${tokenId}`;  // Change URL to match your frontend

    console.log(url)

    // Send the email with the URL
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.Email,
            pass: process.env.Email_Password,
        },
    });

    const mailOptions = {
        from: 'alanyou73@gmail.com',
        to: 'alanyousefzadeh@gmail.com',  // The user's email
        subject: 'Change your email',
        text: `Click the following link to change your email: ${url}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ error: 'Failed to send email' });
        }
        res.status(200).json({ message: 'Email sent' });
    });
}



