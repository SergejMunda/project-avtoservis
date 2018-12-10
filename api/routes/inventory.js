const express = require('express');
const router = express.Router();

const ctrlInventory = require('../controllers/inventory');

router.get('/', ctrlInventory.get);

router.delete('/:id', ctrlInventory.delete);

router.put('/:id', ctrlInventory.update);

router.get('/add', ctrlInventory.getForm);

router.get('/add/:id', ctrlInventory.getEditForm);

router.post('/add', ctrlInventory.addNew);

module.exports = router;
