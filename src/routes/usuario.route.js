const express = require('express');
const router = express.Router();
const usuario = require('../controllers/usuario.controller');

router.post('/', usuario.create);

module.exports = router;