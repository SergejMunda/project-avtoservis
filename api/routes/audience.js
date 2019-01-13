const express = require('express');
const router = express.Router();

const audRegister = require('../controllers/audience');

router.post('/', audRegister.log);

module.exports = router;
