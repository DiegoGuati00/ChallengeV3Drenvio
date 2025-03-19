const {Schema,model} = require('mongoose');

const preciosEspeciles = new Schema(
    {
        producto: String,
        correo: String,
        price: Number
    },
    {
        timestamps: true
    }
)

export default model("Precios",preciosEspeciles);