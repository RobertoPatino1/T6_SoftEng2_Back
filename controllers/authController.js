const { auth } = require("../config/firebaseConfig");

exports.register = async (req, res) => {
	const { email, password, firstName, lastName } = req.body;

	try {
		const userRecord = await auth.createUser({
			email,
			password,
			displayName: `${firstName} ${lastName}`,
		});

		return res
			.status(201)
			.json({ uid: userRecord.uid, email: userRecord.email });
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

exports.login = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await auth.getUserByEmail(email);

		//TODO: For simplicity, using a simple password comparison (this should be replaced with proper password verification)
		if (user.passwordHash !== password) {
			throw new Error("Invalid password");
		}

		// Generate a custom token
		//TODO: USE JWT (JSON WEB TOKEN) FOR EXTRA POINTS ;)
		const token = await auth.createCustomToken(user.uid);
		return res.status(200).json({ token });
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};
