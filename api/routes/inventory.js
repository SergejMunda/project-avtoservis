const express = require('express');
const router = express.Router();

const ctrlInventory = require('../controllers/inventory');

router.get('/', ctrlInventory.get);

router.get('/add', ctrlInventory.getForm);

router.post('/add', ctrlInventory.addNew);

module.exports = router;