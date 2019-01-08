const express = require('express');
const router = express.Router();

const ctrlService = require('../controllers/service');

router.get('/', ctrlService.get);

router.delete('/:id', ctrlService.delete);

router.put('/:id', ctrlService.update);

router.get('/add', ctrlService.getForm);

router.get('/add/:id', ctrlService.getEditForm);

router.post('/add', ctrlService.addNew);

module.exports = router;
