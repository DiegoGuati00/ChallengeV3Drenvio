
# Backend server with express

This project runs a server with [express.js](https://www.npmjs.com/package/express)

## Run Locally

Clone the project

```bash
  git clone git@github.com:DiegoGuati00/ChallengeV3Drenvio.git
```

Go to the project directory

```bash
  cd backend
```

## Environment Variables

configures the environment variables in a file`.env`

```env
MONGO_URL=mongodb://example:password@localhost:27017
MONGO_DB_NAME=tienda
APP_PORT=3000
COLLECTION_PRECIOS_ESPECIALES=preciosEspeciales
```
## Run project
#### Run in production
```
npm run start
```

#### Run in development
```
npm run start:dev
```
## API Reference

#### Get all productos

```http
  GET /api/v1/productos/${correo}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `correo` | `string` | **Required**. user email |

#### Get all special prices

```http
  GET /api/v1/precios
```
#### Create a special price

```http
  POST /api/v1/precios
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `correo` | `string` | **Required**. user email |
| `producto` | `id` | **Required**. product id |
| `precio` | `number` | **Required**. price |

#### Update a special price

```http
  PUT /api/v1/precios/${id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `id` | **Required**. special price id |

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `correo` | `string` | **Optional**. user email |
| `producto` | `id` | **Optional**. product id |
| `precio` | `number` | **Optional**. price |


#### Delete a special prices

```http
  DELETE /api/v1/productos/${id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `id` | **Required**. special price id |

