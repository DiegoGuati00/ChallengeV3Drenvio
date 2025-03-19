import React, { Suspense, createContext, lazy } from 'react';

//pages
const Home = lazy(()=> import('./../componentes/pages/Home'));
const Articulos = lazy(()=> import('./../componentes/pages/Articulos'));
const Subida = lazy(()=> import('./../componentes/pages/Subida'));


const ComponentesContex = createContext();
const Cargando = ()=>{
    return(
        <div>
            <h2> cargando... </h2>
        </div>
    )
}
const ComponentesProvider = ({children}) => {
    let data = {
        Home:(config={})=><Suspense fallback={<Cargando/>}><Home config={config}/></Suspense>,
        Articulos:(config={})=><Suspense fallback={<Cargando/>}><Articulos config={config}/></Suspense>,
        Subida:(config={})=><Suspense fallback={<Cargando/>}><Subida config={config}/></Suspense>,
    }
    return (<ComponentesContex.Provider value={data}>{children}</ComponentesContex.Provider>
    );
}
export {ComponentesProvider}
export default ComponentesContex;
