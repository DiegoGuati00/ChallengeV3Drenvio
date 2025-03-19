import home from "./home.page";
import articulos from "./articulos.page";
import subida from "./subida.page";

const app = {
    tree:{
        tree:   [
            [["home","/"],false,"faHouse"],
            [["articulos","/articulos"],false,"faLayerGroup"],
            [["subida","/subida"],false,"faAddressBook"],
        ],
        footer:{
            titulo:"",
            redes:{
                facebook:"https://www.facebook.com",
                instagram:"https://www.instagram.com",
                twitter:"https://twitter.com/",
                youtube:"https://www.youtube.com/"
            }
        }
    },

    
    pages:[
        home,
        articulos,
        subida
    ]



}
export default app;