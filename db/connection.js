const mysql = require('mysql2');
require('dotenv').config();

// MySQL connection
const connection = mysql.createConnection({
    host: process.env.host,
    user: process.env.user, // replace with your MySQL username
    password: process.env.password, // replace with your MySQL password,
    database: process.env.DB,
    port: process.env.port
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

module.exports = connection;
