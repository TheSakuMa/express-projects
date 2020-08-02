const express = require('express');
const router = express.Router();
const CRUDController = require('../crudController');

router.get('/', CRUDController.findAll);

router.post('/', CRUDController.create);

router.post('/:id', CRUDController.update);

router.delete('/:id', CRUDController.delete);

module.exports = router;