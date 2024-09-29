const express = require('express');
const router = express.Router();
const {login, changeEmailResponse} = require("../controllers/loginController");

router.post('/', login);
router.post('/:change-email',changeEmailResponse);

module.exports = router;

