const express = require('express');
const router = express.Router();

const ctrlRegister = require('../controllers/register');

router.post('/', ctrlRegister.login);

module.exports = router;
