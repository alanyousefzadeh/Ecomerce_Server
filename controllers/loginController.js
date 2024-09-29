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

exports.changeEmailResponse = (req, res) => {
    const { token, newEmail } = req.body;

    console.log("line 133, token", token);
    console.log(newEmail);

    // Verify the token
    jwt.verify(token, process.env.JWT, async (err, decoded) => {
        if (err) {
            return res.status(400).json({ error: 'Invalid or expired token' });
        }

        const userId = decoded.id;

        try {
            // Update the user's email in the database
            UserModel.updateEmail(userId, newEmail, (err, result) => {
                if (err) {
                    console.error('Failed to update email:', err);
                    return res.status(500).json({ error: 'Database query error' });
                }

                // Move success response here to ensure it's only sent after the update
                return res.status(200).json({ message: 'Email changed successfully' });
            });
        } catch (error) {
            console.error('Failed to update email:', error);
            return res.status(500).json({ error: 'Failed to change email' });
        }
    });
};
