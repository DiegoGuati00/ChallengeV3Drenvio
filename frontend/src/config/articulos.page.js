const build = {
    id:{
        url:'/articulos',
        component:'',
        name:"Articulos -"
    },
    html:[
        ['Articulos',"articulos"],
    ],
    data:{
        articulos:{
            apiUrl: import.meta.env.VITE_APP_URL
        }
    }
}

export default build;