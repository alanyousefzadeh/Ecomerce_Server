const UserModel = require("../models/loginModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.userFieldsValidation = (req, res,Email,Password,Address,Phone) => {
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
}
