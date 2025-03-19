import React, { useContext, useEffect, useState } from 'react';
import ComponentesContex from '../contex/ComponentesContex';
import { Helmet } from 'react-helmet-async';
// import Head from 'next/head';

const BuildPage = ({config}) => {
    const lisdata = useContext(ComponentesContex);
    const [html, setHtml] = useState([]);
    const [configu, setConfigu] = useState({});
    useEffect(() => {
        setHtml([]);
        setConfigu({});
        window.scroll({
            top: 0,
            left: 0,
            // behavior: 'smooth'
            behavior: 'instant'
          });
    }, [config]);
    useEffect(() => {
        // console.log(Routes())
        if(config.html && config.data){
            setHtml(config.html);
            setConfigu(config.data);
        }
    }, [html,configu]);
    return (
        <main className={'page '+(config.id.component)}>
            <Helmet>
                <meta name="description" content={config.id.descripcion?config.id.descripcion:"comidas"} />
                <title>{config.id.name?config.id.name + " drenvio challenge":"drenvio"}</title>
            </Helmet>
            {
                html.map((element, index) => {
                    // console.log(typeof(element)!='string')
                    // console.log(element[1]?configu[element[1]]:{})
                    if(typeof(element)!='string'){
                        if(lisdata[element[0]]){
                            return <div key={index} className={element[2]} id={element[3]?element[3]:null}>{
                                lisdata[element[0]](element[1]?configu[element[1]]:{})
                                }</div> 
                        }
                    }else{
                        if(lisdata[element]){
                            return <div key={index}>{lisdata[element]()}</div>
                        }
                    }
                    
                })
            }
        </main>
    );
}

export default BuildPage;
