const express = require('express');
const router = express.Router();

const ctrlInventory = require('../controllers/inventory');

router.get('/', ctrlInventory.get);

router.delete('/:id', ctrlInventory.delete);

router.put('/:id', ctrlInventory.update);

router.get('/:id', ctrlInventory.getOne);

router.post('/', ctrlInventory.addNew);

module.exports = router;
