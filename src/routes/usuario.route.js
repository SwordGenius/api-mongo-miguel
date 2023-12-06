const express = require('express');
const router = express.Router();
const usuario = require('../controllers/usuario.controller');

router.post('/', usuario.create);
router.get('/', usuario.index);
router.get('/:id', usuario.getById);
router.patch('/:id', usuario.patch);
router.put('/:id', usuario.put);

module.exports = router;