const updateLocation = (req, res) => {
	const { latitude, longitude } = req.body;
	const userId = req.user.uid;

	console.log(`User ${userId} updated location:`, { latitude, longitude });

	// Aquí puedes agregar la lógica para almacenar la ubicación en la base de datos si lo deseas

	res.status(200).json({ message: "Location updated successfully" });
};

module.exports = { updateLocation };
