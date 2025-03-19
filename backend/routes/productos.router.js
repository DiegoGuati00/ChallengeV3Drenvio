const express = require('express');
const { validateResult } = require('../middelwares/validators.middelware');
const { param } = require('express-validator');
const { getProductos } = require('../controllers/productos.controller');

const router = express.Router();

router.get('/:correo',
    param("correo")
        .isEmail()
        .withMessage('No es un correo valido'),
    validateResult,
    getProductos
);

module.exports = { productos: router };