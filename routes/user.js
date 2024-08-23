const express = require('express');
const router = express.Router();
const connection = require('../db/connection');
const {getAllUsers, getUserById, createUser, updateUser, deleteUser,register,login} = require("../controllers/userController");


router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post('/register', register);
router.post('/login', login);

module.exports = router;
