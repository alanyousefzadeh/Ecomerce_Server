const jwt = require('jsonwebtoken');

// Secret key for JWT (ideally store this in an environment variable)
const jwtSecret = process.env.JWT

const verifyToken = (req, res, next) => {
    let token = req.headers['authorization'];
    if(token === undefined){
        token = req.body.token
    }
    console.log('Token:', token); // Debugging log


    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    console.log(jwtSecret)
    // Verify the token
    jwt.verify(token.split(" ")[1], jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Failed to authenticate token' });
        }

        // Token is valid, save the user ID for future use in the route
        req.userId = decoded.id;
        next();
    });
};

module.exports = verifyToken;
