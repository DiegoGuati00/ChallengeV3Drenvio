import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Lista from '../../helps/Lista';
import TablaComp from '../TablaComp';
import Swal from 'sweetalert2';
const Subida = ({config={}}) => {
    const {
        apiUrl="http://localhost"
    } = config;
    const [precios, setPrecios] = useState([]);
    const [productos, setProductos] = useState([]);
    const [listProductos, setListProductos] = useState([]);
    const [errors, setErrors] = useState([]);
    const [actionForm, setActionForm] = useState(null);
    const [correo, setCorreo] = useState("");
    const [producto, setProducto] = useState("");
    const [precio, setPrecio] = useState("");

    const setForm =(correo="",producto="",precio="")=>{
        setCorreo(correo)
        setProducto(producto)
        setPrecio(precio)
    }

    const getPrecios = ()=>{
        axios.get(apiUrl+"/api/v1/precios").then(res=>{
            if(res.status==200){
                const lista = new Lista(res.data);
                lista.format = [
                    "_id",
                    "correo",
                    "producto",
                    "precio"
                ];
                setPrecios(lista.find(true));
            }
        }).catch(error =>{
            alert("error de conexion");
        });
    }

    const storePrecios = (data)=>{
        axios.post(apiUrl+"/api/v1/precios",data).then(res=>{
            if(res.status==201){
                getPrecios();
                setForm();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Creado exitosamente",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }).catch(error =>{
            if(error.status==400){
                setErrors(error.response.data);
            }
        });
    }

    const updatePrecios = (id,data)=>{
        axios.put(apiUrl+"/api/v1/precios/"+id,data).then(res=>{
            if(res.status==200){
                getPrecios();
                setForm();
                setActionForm(null);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Actualizado exitosamente",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }).catch(error =>{
            if(error.status==400){
                setErrors(error.response.data);
            }
        });
    }

    const deletePrecios = (id)=>{
        axios.delete(apiUrl+"/api/v1/precios/"+id).then(res=>{
            if(res.status==200){
                getPrecios();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Eliminado exitosamente",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }).catch(error =>{

        });
    }

    const getProductos = ()=>{
        axios.get(apiUrl+"/api/v1/productos/correo@correo.com").then(res=>{
            if(res.status==200){
                let list = [];
                setProductos(res.data);
                res.data.map(v=>{
                    list.push({
                        name:v.name,
                        value:v._id
                    });
                });
                setListProductos(list);
            }
        }).catch(error =>{
            alert("error de conexion");
        });
    }

    const seend = (e)=>{
        e.preventDefault();
        const data = {
            correo,
            precio,
            producto
        }
        if(actionForm){
            precios.map(v=>{
                if(v[0]==actionForm){
                    if(data.correo == v[1]){
                        delete data.correo;
                    }
                    if(data.precio == v[3]){
                        delete data.precio;
                    }
                    if(data.producto == v[2][1]){
                        delete data.producto;
                    }
                }
            });
            updatePrecios(actionForm,data);
        }else{
            storePrecios(data);
        }
        console.log("ho")
    }
    useEffect(() => {
        getProductos();
        getPrecios();
        return () => {
        };
    }, []);
    useEffect(() => {
        if(productos.length && precios.length && !Array.isArray(precios[0][2])){
            const list = [];
            precios.map(v=>{
                productos.map(p=>{
                    if(p._id == v[2]){
                        v[2] = [p.name,v[2]]
                    }
                })
                list.push(v);
            })
            setPrecios(list)
        }
        return () => {
        };
    }, [precios,productos]);
    return (
        <div id='subida'>
            <h1>subida</h1>

            <div style={{overflow:"auto"}}>
                <TablaComp
                    config={{
                        fielDataa:[
                            "id",
                            "correo",
                            "producto",
                            "precio"
                        ],
                        curentlistDataa:precios,
                        Crud:{
                            crud:true,
                            delete:(e,index,value)=>{
                                deletePrecios(value[0]);
                            },
                            update:(e,index,value)=>{
                                setActionForm(value[0]);
                                setForm(value[1],value[2][1],value[3])
                            }
                        }
                    }}
                />
            </div>

            <div className='formulario'>
                <form onSubmit={seend}>
                    <div>
                        {
                            errors.map((v,i)=>{
                                setTimeout(()=>setErrors([]),16000)
                                return <div key={"error"+i+i} className='error'>
                                    <p>{v.path}</p>
                                    <p>{v.msg}</p>
                                </div>
                            })
                        }
                    </div>
                    <h2>{actionForm?"actualizar ":"crear "} producto</h2>

                    <div>
                        {
                            actionForm?
                                <div className='updateForm'>
                                    <p className='updateFormX' onClick={()=>{
                                        setActionForm(null);
                                        setForm()
                                    }}
                                    >x</p>
                                    <p>{actionForm}</p>
                                </div>
                            :null
                        }
                    </div>

                    <label htmlFor="correo">correo</label>
                    <input id='correo' type="text" value={correo} name='correo' onChange={(e)=>setCorreo(e.target.value)}/>
                    <label htmlFor="precio">precio</label>
                    <input id='precio' type="text" value={precio} name='precio' onChange={(e)=>setPrecio(e.target.value)}/>
                    <label htmlFor="producto">producto</label>
                    <select name="" id="producto" value={producto} onChange={(e)=>setProducto(e.target.value)}>
                        <option value=""> -- -- -- </option>
                        {
                            listProductos.map((v,i)=>{
                                return <option key={"a"+i} value={v.value}>{v.name}</option>
                            })
                        }
                    </select>

                    <input type="submit" value={actionForm ? "actualizar" : "crear"} />
                </form>
            </div>
        </div>
    );
}

export default Subida;
