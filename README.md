    

# Share Your Route Backend

### How to run the project

**Clone the repository**

```
git clone https://github.com/RobertoPatino1/T6_SoftEng2_Back.git
```

**Install dependencies**

```
cd T6_SoftEng2_Back
npm i
```

**Start the server**

```
node index.js
```

**Add the secret key**

```
mkdir .firebase
mv <secret_key>.json .firebase/
```

**Create .env file at the project root**

```
touch .env
```

**Inside the .env file paste the following lines**

```
PORT = 4001
APPLICATION_CREDENTIALS=../.firebase/serviceAccountKey.json
FIREBASE_DATABASE_URL=https://share-your-route-ff4ad-default-rtdb.firebaseio.com
```

### Project considerations

The project is configured to run on *localhost* at port *3001*

### TODO

- Plug in with frontend (Flutter)

---

# API Documentation

> POST petitions should send json with the correct parameters

## User

### Create a new user

#### POST /register

Registers a new user.

**Parameters:**

| Parameter | Description                | Value Type | Example Value        |
| --------- | -------------------------- | ---------- | -------------------- |
| email     | The email of the user      | `string`   | `"msuarez@mail.com"` |
| password  | The password of the user   | `string`   | `"Kx74*/abcd"`       |
| firstName | The first name of the user | `string`   | `"Merlino"`          |
| lastName  | The last name of the user  | `string`   | `"Suárez"`           |

```json
{
	"email": "msuarez@mail.com",
	"password":"Kx74*/abcd",
	"firstName":"Merlino",
	"lastName":"Suárez"
}
```
### Log in a user and start its session (Pendant of revision)
#### POST /login

Logs in a user.

**Parameters:**

| Parameter | Description              | Value Type | Example Value          |
| --------- | ------------------------ | ---------- | ---------------------- |
| email     | The email of the user    | `string`   | `"msuarez@mail.com"`   |
| password  | The password of the user | `string`   | `"Kx74*/abcd"`         |

```json
{
	"email": "msuarez@mail.com",
	"password":"Kx74*/abcd",
}
```

## Routes

### Get a rout by its ID
#### GET /:route_id

**Parameters**

| Parameter| Description     | Value Type| Example Value                 |
| -------- | ----------------| ----------| ------------------------------|
| route_id | UID of the route| `string`  | `"QWFSAFXascasfZXCASf123rras"`|

**Return**
Returns a route object.
```json
{
    "creator_uid": "Abcd1234Efgh5678Ijkl",
    "route_name": "Ruta de los Volcanes",
    "route_description": "Impresionante ruta por la avenida de los volcanes en Ecuador",
    "route_distance": 150,
    "route_locations": [
        {
            "latitud": -0.1807,
            "longitud": -78.4678
        },
        {
            "latitud": -1.3928,
            "longitud": -78.4269
        },
        {
            "latitud": -1.6583,
            "longitud": -78.6569
        }
    ]
}
```

### Get a route by its name
#### GET /:route_name

**Parameters**

| Parameter         | Description        | Value Type  | Example Value      |
| ----------------- | ------------------ | ----------- | ------------------ |
| route_name        | Name of the  route | `string`    | `"Ruta Spondylus"` |

### Create a new Route

#### POST /saveRoute

**Parameters**

| Parameter         | Description                              | Value Type                    | Example Value                                     |
| ----------------- | ---------------------------------------- | ----------------------------- | ------------------------------------------------- |
| creator_uid       | UID of the User creating the route       | `string`                    | `"Xcvdsa23sdvasd123rras" `                      |
| route_name        | Name of the route                        | `string`                    | `"Ruta Spondylus"`                              |
| route_description | Description of the route                 | `string`                    | `"Increíble ruta por la costa ecuatoriana"`    |
| route_distance    | Distance of the route in kilometers (km) | `float`                     | `3`                                             |
| route_locations   | Array with the locations of the route    | `array[hash(string,float)]` | `[{"latitud":2.3145,"longitud":79.12414},...}]` |

```json
{
    "creator_uid": "Xcvdsa23sdvasd123rras",
    "route_name": "Ruta Spondylus",
    "route_description": "Increíble ruta por la costa ecuatoriana",
    "route_distance": 3,
    "route_locations": [
        {
            "latitud": 2.3145,
            "longitud": 79.12414
        },
        {
            "latitud": 2.3145,
            "longitud": 79.12414
        },
        ...
    ]
}
```


