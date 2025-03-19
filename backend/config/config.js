const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
// console.log(process.env)
const config = {
    MONGO_URL: process.env.MONGO_URL || null,
    MONGO_DB_NAME: process.env.MONGO_DB_NAME||"tienda",
    APP_PORT: process.env.APP_PORT || 3000,
    COLLECTION_PRECIOS_ESPECIALES: process.env.COLLECTION_PRECIOS_ESPECIALES || "preciosEspeciales"
}

module.exports = { config }