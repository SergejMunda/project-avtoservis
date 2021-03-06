const express = require('express');
const router = express.Router();

const ctrlRegister = require('../controllers/register');

router.get('/', ctrlRegister.get);
router.post('/', ctrlRegister.register);

module.exports = router;
