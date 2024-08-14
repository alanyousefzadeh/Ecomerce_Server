const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./routes/user');
const productRouter = require('./routes/product');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());



//Routes
app.use('/user', userRouter);
app.use('/product', productRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
