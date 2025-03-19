const express = require('express');
const { preciosEspeciales } = require('./routes/preciosEspeciales.router');
const { productos } = require('./routes/productos.router');
const { corsConfig } = require('./config/cors');

const cors = require('cors');
const app = express();

// Enable incoming JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Enable incoming CORS
app.use(cors(corsConfig));

// Endpoints
app.use('/api/v1/precios', preciosEspeciales);
app.use('/api/v1/productos', productos);

module.exports = { app };