const { admin, db } = require("../services/firebase");
const { validateRegister, validateLogin } = require("../utils/validate");

const register = async (req, res) => {
	const { email, password, firstName, lastName } = req.body;

	const { valid, errors } = validateRegister(
		email,
		password,
		firstName,
		lastName
	);
	if (!valid) return res.status(400).json(errors);

	try {
		const userRecord = await admin.auth().createUser({
			email,
			password,
			displayName: `${firstName} ${lastName}`,
		});

		await db.collection("users").doc(userRecord.uid).set({
			firstName,
			lastName,
			email,
		});

		res.status(201).json({ message: "User created successfully" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const login = async (req, res) => {
	const { email, password } = req.body;

	const { valid, errors } = validateLogin(email, password);
	if (!valid) return res.status(400).json(errors);

	try {
		const userRecord = await admin.auth().getUserByEmail(email);
		const token = await admin.auth().createCustomToken(userRecord.uid);

		res.json({ token });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = { register, login };
