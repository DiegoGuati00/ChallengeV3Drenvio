const { config } = require("../config/config");
const { Mongo } = require("../utils/mongo");
const { mongo, ObjectId} = require('mongodb');


const collectionName = config.COLLECTION_PRECIOS_ESPECIALES;


const client = new Mongo();
const db = client.db();

exports.getPreciosEspeciales = (req,res)=>{
    db.get(collectionName,{},(data)=>res.status(200).json(data));
}

exports.storePreciosEspeciales = (req,res)=>{
    const {correo,producto,precio} = req.body;
    const newPrecio = {
        correo,
        producto,
        precio:parseInt(precio)
    }

    db.get("productos",{_id:new ObjectId(producto)},(values)=>{
        
        if(values.length){
            db.get(collectionName,{},(precios)=>{
                let inPrecios = null;
                precios.map((val)=>{
                    if(val.producto == producto && val.correo == correo){
                        inPrecios = true;
                        res.status(400).json(
                            [
                                {
                                    type: "field",
                                    msg: "Usuario ya cuenta con precio especial en este producto",
                                    path: "producto",
                                    location: "body"
                                }
                            ]
                        );
                    }
                })
                if(!inPrecios){
                    db.insert(collectionName,newPrecio,(data)=>res.status(201).json(data));
                }
            });
        }

        if(!values.length){
            res.status(400).json(
                [
                    {
                        type: "field",
                        msg: "El producto es invalido",
                        path: "producto",
                        location: "body"
                    }
                ]
            );
        }

    });
    
}

exports.updatePreciosEspeciales = (req,res)=>{
    const {id} = req.params;
    const {
        correo=null,
        producto=null,
        precio=null
    } = req.body;
    const upPrecio = {}
    if(correo){
        upPrecio.correo = correo
    }
    if(producto){
        upPrecio.producto = producto
    }
    if(precio){
        upPrecio.precio = precio
    }
    const up = Object.values(upPrecio).length;
    if(up){
        db.get(collectionName,{_id:new ObjectId(id)},(values)=>{
            if(values.length){
                const currentPrecio = values[0];
                if(upPrecio.producto){
                    db.get("productos",{_id:new ObjectId(producto)},(val)=>{
                        if(val.length){
                            if(upPrecio.correo){
                                db.get(collectionName,{},(list)=>{
                                    let crear = true;
                                    list.map((v)=>{
                                        if(v.correo == upPrecio.correo && v.producto == new ObjectId(producto)){
                                            crear = null;
                                        }
                                    });

                                    if(crear){
                                        db.update(collectionName,{_id:new ObjectId(id)},upPrecio,(data)=>res.status(200).json(upPrecio));
                                    }else{
                                        res.status(400).json(
                                            [
                                                {
                                                    type: "field",
                                                    msg: "Usuario ya cuenta con precio especial en este producto",
                                                    path: "producto",
                                                    location: "body"
                                                }
                                            ]
                                        );
                                    }
                                });
                            }else{
                                db.get(collectionName,{},(list)=>{
                                    let crear = true;
                                    list.map((v)=>{
                                        if(v.correo == currentPrecio.correo && v.producto == new ObjectId(producto)){
                                            crear = null;
                                        }
                                    });

                                    if(crear){
                                        db.update(collectionName,{_id:new ObjectId(id)},upPrecio,(data)=>res.status(200).json(upPrecio));
                                    }else{
                                        res.status(400).json(
                                            [
                                                {
                                                    type: "field",
                                                    msg: "Usuario ya cuenta con precio especial en este producto",
                                                    path: "producto",
                                                    location: "body"
                                                }
                                            ]
                                        );
                                    }
                                });
                            }
                        }else{
                            res.status(400).json(
                                [
                                    {
                                        type: "field",
                                        msg: "404 Producto no encontrado",
                                        path: "producto",
                                        location: "body"
                                    }
                                ]
                            );
                        }
                    });
                }else if(upPrecio.correo){
                    db.get(collectionName,{},(list)=>{
                        let crear = true;
                        list.map((v)=>{
                            if(v.correo == upPrecio.correo && v.producto == currentPrecio.producto){
                                crear = null;
                            }
                        });

                        if(crear){
                            db.update(collectionName,{_id:new ObjectId(id)},upPrecio,(data)=>res.status(200).json(upPrecio));
                        }else{
                            res.status(400).json(
                                [
                                    {
                                        type: "field",
                                        msg: "Usuario ya cuenta con precio especial en este producto",
                                        path: "producto",
                                        location: "body"
                                    }
                                ]
                            );
                        }
                    });
                }else{
                    db.update(collectionName,{_id:new ObjectId(id)},upPrecio,(data)=>res.status(200).json(upPrecio));
                }
            }else{
                res.status(400).json([
                    {
                      "type": "field",
                      "value": id,
                      "msg": "404 producto no encontrado",
                      "path": "id",
                      "location": "params"
                    }
                ])
            }
        })
    }else{
        res.status(200).json(up);
    }
}

exports.deletePreciosEspeciales = (req,res)=>{
    const {id} = req.params;
    db.delete(collectionName,{_id:new ObjectId(id)},(data)=>res.status(200).json({}));
}