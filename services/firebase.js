const admin = require("firebase-admin");
const serviceAccount = require("../firebaseServiceAccountKey.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	//TODO: ADD DATABASE URL
	databaseURL: "https://<database-name>.firebaseio.com",
});

const db = admin.firestore();

module.exports = { admin, db };
