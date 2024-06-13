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
