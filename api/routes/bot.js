const express = require('express');
const router = express.Router();
const ctrlInventory = require('../controllers/bot');

router.post('/', ctrlInventory.connect);
module.exports = router;
