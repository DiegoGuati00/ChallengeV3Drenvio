import React, { useContext, useEffect, useState } from 'react';
import Swal from "sweetalert2";
import axios from "axios";
import ImgContex from '../../contex/ImgContex';
const Articulos = ({config={}}) => {
    const {
        apiUrl="http://localhost"
    } = config;
    const [articulos, setArticulos] = useState([]);
    const [usuario, setUsuario] = useState(null);
    const IMGProvider = useContext(ImgContex);
    const listImg = [
        "reImg1",
        "reImg2",
        "reImg3",
        "reImg4",
        "reImg5",
    ];
    const getRandomInt=()=> {
        return Math.floor(Math.random() * 5);
    }


    const setCookie = (cname, cvalue, exdays)=> {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    const getCookie = (cname)=> {
        let name = cname + "=";
        let ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
    }

    const logout = ()=>{
        setCookie("correo","",0);
        window.location.reload();
    }
    useEffect(() => {
        const correo = getCookie("correo");
        const consultar = ()=>Swal.fire({
            title: "Correo electronico",
            input: "text",
            inputAttributes: {
              autocapitalize: "off"
            },
            showCancelButton: true,
            confirmButtonText: "login",
            cancelButtonText: "logout",
            showLoaderOnConfirm: true,
            preConfirm: (login) => getData(login),
            allowOutsideClick: () => !Swal.isLoading()
          }).then((result) => {
            if (result.dismiss) {
                window.location.replace("/");
            }else if(result.isDenied){
                window.location.replace("/");
            }
        });
        const getData = (login) => {
            axios.get(apiUrl+"/api/v1/productos/"+login).then((res)=>{
                if(res.status == 200){
                    if(!correo){
                        setCookie("correo",login,1);
                        setUsuario(login);
                    }
                    setArticulos(res.data);
                }
            })
            .catch(error=>{
                Swal.fire({
                    title: "No autenticado",
                    text: "usuario invalido",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Reintentar",
                    cancelButtonText: "No, cancel!",
                    reverseButtons: true
                  }).then((result) => {
                    if (result.isConfirmed) {
                      consultar()
                    } else if(result.dismiss) {
                        window.location.replace("/");
                    }else{
                        window.location.replace("/");
                    }
                  });
            });
        }
        if(correo){
            setUsuario(correo);
            getData(correo);
        }else{
            consultar();
        }
        return () => {
            
        };
    }, []);
    return (
        <div id='articulos'>
            <div className='barra'>
                <h2>{usuario}</h2>
                <button onClick={logout}>logout</button>
            </div>
            <h1>articulos</h1>
            <div className='C1'>
                {
                    articulos.map(val => {
                        return <div key={val._id} className='Cart'>
                            <div>
                                <img src={IMGProvider[listImg[getRandomInt()]]} alt="" />
                            </div>
                            <div>
                                {
                                    val.priceEspecial ?
                                        <>
                                            <p className='realPrice'>$ {val.price}</p>
                                            <p className='price'>$ {val.priceEspecial} <span>{100-Number.parseFloat((val.priceEspecial/val.price)*100).toFixed(0)}% OFF</span></p>
                                        </>
                                    :
                                        <p className='price'>$ {val.price}</p>
                                }
                                <p>{val.description}</p>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    );
}

export default Articulos;
