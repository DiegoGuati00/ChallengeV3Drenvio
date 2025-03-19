const build = {
    id:{
        url:'/subida',
        component:''
    },
    html:[
        ['Subida',"subida"],
    ],
    data:{
        subida:{
            apiUrl:import.meta.env.VITE_APP_URL
        }
    }
}

export default build;