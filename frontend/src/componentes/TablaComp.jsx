import { faEye, faPen } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import FontAwesomeIcono from './FontAwesomeIcono';
import Swal from 'sweetalert2';
/*
config
        num,
        fielDataa,
        curentlistDataa,
        Crud=false,
        goTo=null
*/

export default function TablaComp({config}){
    // console.log(config)
    const {
        num,
        fielDataa,
        curentlistDataa,
        Crud=false,
        goTo=null
    } = config;
    let vh = window.innerHeight;
    let vw = window.innerWidth;
    let navigate = null;
    const tamaño= ()=>{
        let res = vh > 400 ? vh - 350:'auto'
        if(res !== 'auto' && vw >= 900){
            res+=70
        }
        return res
    }
    //config
    const [crud, setCrud] = useState(Crud);

    
    
    //config
    //lista de titulos de las columnas
    //list the field from de the colum
    const [listField, setListField] = useState(fielDataa);
    //lista de titulos de las filas
    //list the title from de row
    const [data, setData] = useState(curentlistDataa);
    const [filterNum, setFilterNum] = useState(0);
    const [over, setOver] = useState(true);
    const selecCelda = (e)=>{
        let qr = e.target.parentElement;
        if(!qr.dataset.l){
            qr = qr.parentElement;
        }
        let celdas = document.querySelectorAll('.t-row');
        if(qr.classList.toggle('succes')){
            celdas.forEach((c)=>{
                c.classList.remove('succes');
            })
            qr.classList.toggle('succes')
            if(data[qr.dataset.l]){
                // console.log(data[qr.dataset.l])
                // setIsSelect(data[qr.dataset.l][GoTo]);
            }
        }else{
            setIsSelect(null);
        }
        // console.log(qr.classList.toggle('succes'));
        // console.log(isSelect);
    }

    const nextSelec = (suma=null) => {
        let celdas = document.querySelectorAll('.t-row');
        let row =null;
        if(!over){
            return;
        }
        celdas.forEach((c)=>{
            if(c.classList.contains('succes')){
                console.log(c)
                row = c;
            }
        })
        if(row){
            if(row.dataset.l == (celdas.length-1)){
                return;
            }else{
                row.classList.remove('succes')
                celdas.forEach((cRow)=>{
                    if(suma){
                        if(Number(cRow.dataset.l) === (Number(row.dataset.l)+1)){
                            cRow.classList.toggle('succes')
                        }
                    }else{
                        if(Number(cRow.dataset.l) === (Number(row.dataset.l)-1)){
                            cRow.classList.toggle('succes')
                        }
                    }
                })
            }
            // console.log([row])
            // console.log(row.parentElement.scrollHeight)
            // console.log(row.parentElement.scrollTop)
            // console.log(celdas.length)
            // console.log(row.dataset)
        }else{
            // console.log('no hay')
            celdas.forEach((cRow)=>{
                
                // console.log(cRow.dataset.l)
                if(cRow.dataset.l === '0'){
                    cRow.classList.toggle('succes')
                    console.log(cRow)

                }
            })

        }
            

    }

    const eventDown = (e)=>{
        // console.log(e)
            // console.log(e.keyCode == 37|38|39|40)
            switch (e.keyCode) {
                case 37:
                    console.log(e.keyCode == 37)
                    break;
                case 38:
                    nextSelec()
                    console.log(e.keyCode == 38)
                    break;
                case 39:
                    console.log(e.keyCode == 39)
                    break;
                case 40:
                    nextSelec(true)
                    console.log(e.keyCode == 40)
                    break;
                    
                default:
                    break;
            }
    }

    const redirec = (e,value)=>{
        if(goTo && goTo.url){

            let goUrl = goTo.url;
            let goParams = {};

            if(goTo && goTo.names && goTo.num){
                let parametros = goTo.num;
                goTo.names.map((val,iVal)=>{
                    let parametro = parametros[iVal] || parametros[iVal]==0 ?parametros[iVal]:null;
                    if(Number.isInteger(parametro)){
                        goParams[val] =  value[parametro];
                    }else if(Array.isArray(parametro) && parametro.length){
                        goParams[val] =  parametro[0];
                    }
                });
                // router.get(route(goUrl,goParams));
            }

        }else{
            alert("no hay accion");
        }
    }

    const setInto = (e)=>{
        // console.log(e)
        // console.log('en')
    }
    const setNotInto = (e)=>{
        // console.log('out')
    }

    const Az = (e,index=0)=>{
        // console.log(index);
        // data.forEach((s)=>console.log(s[index]))
        setFilterNum(index);
    }
    const eliminarItem = (e,index)=>{
        const verificar = ()=>{
            Swal.fire({
                title: 'Esta seguro que desea eliminar esta fila.',
                showDenyButton: true,
                // showCancelButton: true,
                confirmButtonText: 'si, eliminar esta fila',
                denyButtonText: `cancelar`,
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed && crud.delete) {
                    crud.delete(e,index,data[index]);
                  Swal.fire('Fila Eliminada', '', 'success')
                } else if (result.isDenied) {
                  Swal.fire('Changes are not saved', '', 'info')
                }else{
                    Swal.fire('No fue posible realizar la accion solicitada.', '', 'info')
                }
              })
        }
        verificar();
    }
    const editarItem = (e,index,value)=>{
        if(crud.update){
            crud.update(e,index,value);
        }
    }
    const showItem = (e,index,value)=>{
        if(crud.show){
            crud.show(e,index,value);
        }
    }

    useEffect(() => {
        if(goTo){
            if(goTo.names && goTo.num){
                setGoTo(goTo.num);
            }
        }
    }, [goTo]);
    
    useEffect(() => {
        // console.log(data)
        // if(num){
        //     setNumCurrentPage(num);
        // }
        // return ()=>{
        //     setNumCurrentPage(null);

        // }
    }, []);
    // useEffect(() => {
    //     document.addEventListener('keydown',(e)=>{
    //         console.log(e)
    //         // console.log(e.keyCode == 37|38|39|40)
    //         switch (e.keyCode) {
    //             case 37:
    //                 console.log(e.keyCode == 37)
    //                 break;
    //             case 38:
    //                 nextSelec()
    //                 console.log(e.keyCode == 38)
    //                 break;
    //             case 39:
    //                 console.log(e.keyCode == 39)
    //                 break;
    //             case 40:
    //                 nextSelec(true)
    //                 console.log(e.keyCode == 40)
    //                 break;
                    
    //             default:
    //                 break;
    //         }
    //     });
    // }, [over]);
    const trasformData = (data)=>{
        let newData = data.map((v)=>v);
        // console.log(newData);
        return newData.sort((a, b) => {
            const nameA = a[filterNum]; // ignore upper and lowercase
            const nameB = b[filterNum]; // ignore upper and lowercase
            // console.log(nameA)
            // console.log(nameB)
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
          
            // names must be equal
            return 0;
          });
    }
    
    useEffect(() => {
        if(curentlistDataa){
            // console.log(curentlistData);
            setData(trasformData(curentlistDataa));
        }else if(curentlistData){
            setData(curentlistData);
        }
        
        if(fielDataa){
            setListField(fielDataa);
        }else if(fielData){
            setListField(fielData);
        }
        // console.log(data);
        return () => {
            setData([]);
        }
    }, [curentlistDataa,fielDataa,filterNum]);
    useEffect(() => {
        setCrud(Crud)
    }, [Crud]);

    
  return (
    <div>
        <div id='tablaComp' 
        // style={{height:tamaño()-23}}
        // onPointerDown={eventDown}
        //  onMouseLeave={()=>setOver(false)} onMouseEnter={()=>setOver(true)}
        >
            <div className='t-first'>
                <div className='t-cajon'>
                    {listField.map((value,index)=>{
                        if(value){
                            return <div key={index} onClick={(e)=>Az(e,index)} className='tc-cajon'>
                                <p>{value}</p>
                            </div>
                        }
                        
                    })}
                    
                    {
                        crud ?
                        <div className='tc-cajon'>
                            <p>{crud.title ? crud.title :'crud'}</p>
                        </div>
                        :null
                    }
                </div>
                
            </div>
            <div className='t-second' style={{'maxHeight':tamaño()-95}}>
                {
                    data.map((value, index)=>{
                        let c = 't-row '+value.clase;
                        return <div key={"dataTabla"+index} className={c} data-l={index} onClick={selecCelda} onDoubleClick={(e)=>redirec(e,value)}>
                            {
                                listField.map((val,i)=>{
                                    return (
                                        <div key={"dataTabla-celda"+i} className="t-celda">
                                            <Celda ke={i} text={value[i]} cl={false}/>
                                        </div>
                                    );
                                })
                            }
                            {
                                crud ?
                                <div className="t-celda">
                                    <Celda cl={false} text={
                                        <div className='tablaCrud' >
                                            {
                                                crud.crud == true ?
                                                <>
                                                {
                                                    crud.delete?
                                                    <div className='t-celda btn-celda delete' onClick={(e)=>eliminarItem(e,index,value)} ><FontAwesomeIcon icon={faTrash}/></div>
                                                    :null
                                                }
                                                {
                                                    crud.update?
                                                    <div className='t-celda btn-celda' onClick={(e)=>editarItem(e,index,value)} ><FontAwesomeIcon icon={faPen}/></div>
                                                    :null
                                                }
                                                {
                                                    crud.show?
                                                    <div className='t-celda btn-celda' onClick={(e)=>showItem(e,index,value)} ><FontAwesomeIcon icon={faEye}/></div>
                                                    :null
                                                }
                                                </>:null
                                            }
                                            {
                                                crud.botones?
                                                crud.botones.map((a,i)=>{
                                                    const Fn = (e)=>{
                                                        if(a.fn){
                                                            a.fn(e);
                                                        }
                                                    }
                                                    if(a.Celda){
                                                        switch (a.Celda) {
                                                            case 'modal':
                                                                return <div className='t-celda btn-celda' >{a.modal(index,value)}</div>;
                                                                break;
                                                            default:
                                                                break;
                                                        }
                                                    }
                                                    return <div key={"sa"+i} style={a.style?a.style:{}} className='t-celda btn-celda' onClick={Fn} >{
                                                        a.icon ?
                                                        <FontAwesomeIcono iconName={a.icon}/>
                                                        :null
                                                    }</div>
                                                }):null
                                            }
                                            {/* <Celda key={index+'crud'} text={<FontAwesomeIcon icon={faTrash}/>}/> */}
                                        </div>
                                    }/>
                                </div>
                                :null
                            }
                        </div>
                    }
                    )
                }
                
            </div>
        </div>
    </div>
  )
}

export function Celda({ke ,text,cl=true}){
  return (
    <div 
    className={cl?'t-celda':null} 
    // key={ke}
    >
        {
        Array.isArray(text) ? 
            text.map((val,i)=>{
                return <p key={"hola"+i}>{val}</p>
            } )
        :
            (
                typeof text == "object" ?
                    <div>{text}</div>
                :
                    <p>{text}</p>
            )
        }
    </div>
  )
}
