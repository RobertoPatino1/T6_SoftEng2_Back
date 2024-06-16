const { db } = require("../config/firebaseConfig");

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

