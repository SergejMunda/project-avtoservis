const express = require('express');
const router = express.Router();

const ctrlService = require('../controllers/service');

router.get('/', ctrlService.get);

router.get('/add', ctrlService.getForm);

router.post('/add', ctrlService.addNew);

module.exports = router;