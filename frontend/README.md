
# Frontend whith react and vite

The configuration for this project is located in the `src/config` folder in the `app.js` file.

```
# src/config/app.js
{
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
```

The `tree.tree:[]` configuration receives an array with the menu configuration and a `tree.footer:{}` with the page's footer configuration.

It also receives a pages `option:[]` which is an array with the configuration for each page.

## tree.tree:[]

each element of the `[]` must be a `[]` where the first element is a `[]` that contains in position `0` the title of the button in the navigation bar and in position `1` goes the url to which it should go when clicking `["button name","/urlOfButton"]` the second element of the `[]` receives a list of sub buttons with the same configuration `["button name","/urlOfButton"]` or `false` if not necessary. It receives a third parameter which is a `string` with the name of the icon from the [fontawesome](https://fontawesome.com/search?o=r&ic=free&ip=brands) library configured in the `FontAwesomeIcono.jsx` component in the `src/components` folder

```
# option 1
[
  [
    "home", // button name
    "/" // urlOfButton
  ],
  false, // no sub buttons
  "faHouse" // icon name
]

# option 2
[
  [
    "home", // button name
    "/" // urlOfButton
  ],
  [ // sub button list
    [
      "home", // button name
      "/" // urlOfButton
    ]
  ],
  "faHouse" // icon name
]
```

## pages:[]
pages is a `[]` of `{}` with the pages configuration each object has these characteristics:

```
{
    id:{
        url:'/', // page url
        component:'', // add classes to the page
        name:"" // page title
    },
    html:[ // components that make up the page
        'Home', // component name
        [
          "home",
          "homeData"
        ],
        [
          "home", // component name
          "homeData",//name of the data attribute that contains the props that the component receives
          "componentClass" // class or classes that should be added to the div containing the component
        ]
    ],
    data:{ // information that is passed to the components
      homeData:{}
    }
}
```

## configure components

To add components to the project you have to configure it in the `ComponentesContex.jsx` in the `src/contex` folder first importing it in the file and then adding it to the `ComponentesProvider` so that the application has access to the component

```
//pages
const Home = lazy(()=> import('./../componentes/pages/Home'));

const ComponentesProvider = ({children}) => {
    let data = {
        Home:(config={})=><Suspense fallback={<Cargando/>}><Home config={config}/></Suspense>,
    }
    return (<ComponentesContex.Provider value={data}>{children}</ComponentesContex.Provider>
    );
}
```

# Run Locally

Clone the project

```bash
  git clone git@github.com:DiegoGuati00/ChallengeV3Drenvio.git
```

Go to the project directory

```bash
  cd frontend
```

Install dependencies

```bash
  npm install
```

## Environment Variables
configures the environment variables in a file `.env`

`VITE_APP_URL=http://localhost:3000`


# Compile to production

compile the files to get the production version in the `/dist` folder

```env
npm run build
```

# Development mode

To run the project in development mode you have to run the command

```env
npm run dev
```

which exposes the project on port 5173