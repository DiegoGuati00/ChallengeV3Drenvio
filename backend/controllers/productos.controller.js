const { config } = require("../config/config");
const { Mongo } = require("../utils/mongo");
const { mongo, ObjectId} = require('mongodb');


const collectionName = config.COLLECTION_PRECIOS_ESPECIALES;

const client = new Mongo();
const db = client.db();

exports.getProductos = (req , res) => {
    const {correo} = req.params;
    db.get(
        collectionName,
        {correo},
        (values)=>{
            db.get("productos",{},
                (productos)=>{
                    const listaProductos = [];
                    productos.map((v)=>{
                        let haveEspecial = null;
                        values.map(e=>{
                            if(JSON.stringify(v._id)=="\""+e.producto+"\""){
                                haveEspecial = e;
                            }
                        });
                        if(haveEspecial){
                            v.priceEspecial = parseInt(haveEspecial.precio);
                        }else{
                            v.priceEspecial = null;
                        }
                        listaProductos.push(v);
                    })
                    res.status(200).json(listaProductos);
                }
            )
        }
    )
}