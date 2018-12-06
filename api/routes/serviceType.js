const express = require('express');
const router = express.Router();

const ctrlService = require('../controllers/serviceType');

router.get('/', ctrlService.get);

router.get('/:id', ctrlService.getOne);

router.delete('/:id', ctrlService.delete);

router.put('/:id', ctrlService.update);

router.post('/', ctrlService.add);

module.exports = router;
