const bcrypt = require("bcryptjs");
const UserModel = require("../models/registerModel");


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
