const { db, admin } = require("../config/firebaseConfig");
const { getDatabase, ref, set } = require("firebase/database");

exports.setRealTimeLocation = async (req, res) => {
	const { uid, latitude, longitude } = req.body;
	app = admin.initializeApp({
		credential: admin.credential.cert(serviceAccount),
		databaseURL: process.env.FIREBASE_DATABASE_URL,
	});
	const db = getDatabase(app);
	const locationRef = ref(db, `locations/${uid}`);

	try {
		await set(locationRef, {
			latitude,
			longitude,
			timestamp: new Date(),
		});

		return res.status(200).json({ message: "Location updated successfully" });
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
}

exports.updateLocation = async (req, res) => {
	const { uid, latitude, longitude } = req.body;

	try {
		await db.collection("locations").doc(uid).set({
			latitude,
			longitude,
			timestamp: new Date(),
		});

		return res.status(200).json({ message: "Location updated successfully" });
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

exports.getLocation = async (req, res) => {
	const { uid } = req.params;

	try {
		const location = await db.collection("locations").doc(uid).get();

		if (!location.exists) {
			return res.status(404).json({ error: "Location not found" });
		}

		return res.status(200).json(location.data());
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
}

