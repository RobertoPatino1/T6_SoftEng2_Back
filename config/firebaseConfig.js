const admin = require("firebase-admin");
require("dotenv").config();

const serviceAccount = require(process.env.APPLICATION_CREDENTIALS);

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: process.env.FIREBASE_DATABASE_URL,
});

const db = admin.firestore();
const realtimeDb = admin.database();
const auth = admin.auth();

module.exports = { admin, db, auth, realtimeDb};
