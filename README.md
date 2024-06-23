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
- The project is configured to run locally on *localhost* at port *3001*
- The deployed version of the backend can be found [here](https://shareyourroute-back.onrender.com/).
- The real time database can be found [here](https://share-your-route-ff4ad-default-rtdb.firebaseio.com).
- The application credentials can only be obtained via the sysadmin.

