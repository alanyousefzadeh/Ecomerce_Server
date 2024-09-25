const UserModel = require("../models/loginModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
    console.log('Request received at /login'); // Debugging log
    const {Email,Password} = req.body;
    console.log('Received data:', Email, Password); // Debugging log

    if (!Email || !Password) {
        return res.status(400).send('Please fill all the required fields');
    }
    bcrypt.hash(Password, 10, (err, hash) => {
            console.log('Hashed password:', hash);
        }
    );

    UserModel.login({Email}, (err, results) => {
            if(err){
                return res.status(500).send('Database query error');
            }
            if (results.length === 0) return res.status(401).json({ message: 'Invalid credentials' });

            const user = results[0];
            const jwtSecret = 'your_jwt_secret'
            bcrypt.compare(Password, user.Password, (err, isMatch) => {
                    console.log('Password', Password); // Debugging log
                    console.log('Hashed password', user.Password); // Debugging log
                    if (err) {
                        return res.status(500).send('Hashing error');
                    }
                    if (!isMatch) {
                        return res.status(401).json({message: 'Invalid credentials'});
                    }
                    const token = jwt.sign({ id: user.id } , jwtSecret, {
                        expiresIn: '12h'
                    });
                    console.log('Token:', token); // Debugging log
                    res.json({ token , user});
                }
            );
        }
    );
}
