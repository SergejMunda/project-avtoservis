const express = require('express');
const router = express.Router();

const ctrlDb = require('../controllers/db');

router.delete('/', ctrlDb.delete);

router.post('/', ctrlDb.loadPresets);

module.exports = router;
