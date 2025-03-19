import './stiles/app.scss'
import { Suspense, useEffect, useState } from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import textos from './config/app'
import BuildPage from './pages/BuildPage'
import MenuComp from './componentes/layout/menu-comp';
import FooterPage from './componentes/layout/FooterPage';

function App() {
  const config =  textos;
  useEffect(() => {
    console.log(config);
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Public menu={config.tree ? config.tree.tree : []} footer={config.tree ? config.tree.footer : {}}/>}>
              {
                config.pages ?
                // console.log(config.pages)
                config.pages.map((dataPage,i) => {
                  // console.log(dataPage)
                  if(i==0){
                    return <Route key={dataPage.id.component} index element={<BuildPage config={dataPage} />}/>
                  }else{
                    return <Route key={dataPage.id.component} path={dataPage.id.url} element={<BuildPage config={dataPage} />}/>
                  }
                })
                :null
              }
        </Route>


      </Routes>
    </div>
  )
}

export function Public({menu=[],footer={}}) {
  return (
    <>
    <Suspense fallback={<Cargando/>}>
      <MenuComp menu={menu}/>
      <Outlet/>
      <FooterPage config={footer}/>
    </Suspense>
    </>
  )
}

const Cargando = ()=>{
  return(
      <div>
          <h2>cargando...</h2>
      </div>
)
}

export default App
