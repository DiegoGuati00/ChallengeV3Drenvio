
# Hi, This is my answer to Drenvio challenge. 👋



El projecto se genero con las tennologias:
- Frontend con react.js.
- Backend con node.js
- Base de Datos MongoDB

## Run Locally

Clone the project

```bash
  git clone git@github.com:DiegoGuati00/ChallengeV3Drenvio.git
```



## Environment Variables

This project has two folders, each receiving its configuration variables in a `.env` file in the corresponding folder.

```env
# /backend/.env
MONGO_URL=mongodb://example:password@localhost:27017
MONGO_DB_NAME=tienda
APP_PORT=3000
COLLECTION_PRECIOS_ESPECIALES=preciosEspeciales
```

```env
# /frontend/.env
VITE_APP_URL=http://localhost:3000
```
## Deployment with Docker

To create the container with Docker you must first run the command

```bash
  bash docker/configInit
```
This command will create the `/config` folder with all the Apache configuration files to serve the frontend, the `CORS` configuration of the backend and the `.env` files of each service so that you can modify them as needed.

## Build the image

Using Docker we build the image

```bash
  docker build -t nombreDeLaImagen .
```

and we run the container

```bash
  docker run -d --restart unless-stopped --name drenviochallenge -p 3000:3000 -p 80:80 -p 443:443 nombreDeLaImagen
```

enter the container

```bash
  docker exec -it idDelContenedor bash
```

turn on the Apache service
```
service apache2 start
```

Create the SSL certificate with CertBot by running the command

```bash
certbot --apache
```