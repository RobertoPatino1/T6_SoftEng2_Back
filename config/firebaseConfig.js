const admin = require("firebase-admin");
const serviceAccount = require("../config/serviceAccountKey.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://share-your-route-ff4ad-default-rtdb.firebaseio.com",
});

const db = admin.firestore();
const auth = admin.auth();

module.exports = { admin, db, auth };
