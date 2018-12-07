const express = require('express');
const router = express.Router();

const ctrlDb = require('../controllers/db');

router.get('/', ctrlDb.get);

//router.delete('/', ctrlDb.delete);

//router.post('/', ctrlDb.addNew);

module.exports = router;