const express = require('express');
const router = express.Router();
const connection = require('../db/connection');
const verifyToken = require('../middleware/auth');  // Import the middleware
const {getAllUsers, getUserById, createUser, updateUser, deleteUser} = require("../controllers/userController");

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);


module.exports = router;
