const express = require('express');
const router = express.Router();
const connection = require('../db/connection');
const {getAllProducts, getProductById} = require("../controllers/productController");

router.get('/', getAllProducts);
router.get('/:id', getProductById);



module.exports = router;


