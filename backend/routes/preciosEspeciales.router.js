const express = require('express');
const { body, validationResult, query, param } = require('express-validator');
const { 
    getPreciosEspeciales, 
    storePreciosEspeciales, 
    updatePreciosEspeciales, 
    deletePreciosEspeciales
} = require('../controllers/preciosEspeciles.controller');
const { validateResult } = require('../middelwares/validators.middelware');

const router = express.Router();

router.get('/', getPreciosEspeciales);
router.post('/',
    body("correo")
        .notEmpty()
        .withMessage('Correo no puede estar basio')
        .isEmail()
        .withMessage('No es un correo valido'),
    body("producto")
        .exists()
        .withMessage('Producto es requerido')
        .notEmpty()
        .withMessage('Producto no puede estar basio')
        .isLength({ min: 24,max:24 })
        .withMessage('Producto invalido')
        .isString()
        .withMessage('No es un producto valido'),
    body("precio")
        .exists()
        .withMessage('Precio es requerido')
        .notEmpty()
        .withMessage('Precio no puede estar basio')
        .isNumeric()
        .withMessage('No es un precio valido'),
    validateResult,
    storePreciosEspeciales
);
router.put('/:id',
    param("id")
    .isLength({ min: 24,max:24 })
    .withMessage('Id invalido'),
    body("correo")
    .optional()
    .notEmpty()
    .withMessage('Correo no puede estar basio')
    .isEmail()
    .withMessage('No es un correo valido'),
    body("producto")
        .optional()
        .notEmpty()
        .withMessage('Producto no puede estar basio')
        .isLength({ min: 24,max:24 })
        .withMessage('Producto invalido')
        .isString()
        .withMessage('No es un producto valido'),
    body("precio")
        .optional()
        .notEmpty()
        .withMessage('Precio no puede estar basio')
        .isNumeric()
        .withMessage('No es un precio valido'),
    validateResult,
    updatePreciosEspeciales
);
router.delete('/:id',
    param("id")
    .isLength({ min: 24,max:24 })
    .withMessage('Id invalido'),
    validateResult,
    deletePreciosEspeciales
);

module.exports = { preciosEspeciales: router };