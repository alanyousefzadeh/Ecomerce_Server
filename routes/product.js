const express = require('express');
const router = express.Router();
const connection = require('../db/connection');
const {getAllProducts, getProductById , createProduct,updateProduct,deleteProduct} = require("../controllers/productController");

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);



module.exports = router;


