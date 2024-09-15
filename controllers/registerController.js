const bcrypt = require("bcryptjs");
const UserModel = require("../models/registerModel");


exports.register = (req, res) => {
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
