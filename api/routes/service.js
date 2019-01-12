const express = require('express');
const router = express.Router();
var jwt = require('express-jwt');
var avtentikacija = jwt({
    secret: process.env.JWT_PASS,
    userProperty: 'payload'
});
const ctrlService = require('../controllers/service');

router.get('/', ctrlService.get);

router.get('/:id', ctrlService.getOne);

router.delete('/:id', avtentikacija, ctrlService.delete);

router.put('/:id', avtentikacija, ctrlService.update);

router.post('/', avtentikacija, ctrlService.addNew);

module.exports = router;
