const express = require('express');
const bodyParser = require('body-parser');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const userRouter = require('./routes/user');
const productRouter = require('./routes/product');
const verifyToken = require("./middleware/auth");

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

app.use('/register', registerRouter);
app.use('/login', loginRouter);

// Apply the JWT middleware globally to protect all routes
app.use(verifyToken);

//Routes
app.use('/user', userRouter);
app.use('/product', productRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
