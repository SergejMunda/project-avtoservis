const express = require('express');
const router = express.Router();

var jwt = require('express-jwt');
var avtentikacija = jwt({
    secret: process.env.JWT_PASS,
    userProperty: 'payload'
});
var guard = require('express-jwt-permissions')({
    requestProperty: 'payload'
});

const ctrlInventory = require('../controllers/inventory');

router.get('/', avtentikacija, ctrlInventory.get);

router.delete('/:id', avtentikacija, ctrlInventory.delete);

router.put('/:id', avtentikacija, ctrlInventory.update);

router.get('/:id', avtentikacija, ctrlInventory.getOne);

router.post('/', avtentikacija, ctrlInventory.addNew);

module.exports = router;
