const { auth, db } = require("../config/firebaseConfig");


function register(req, res) {
	const { email, password, firstName, lastName } = req.body;
	auth.createUser({
		email: email,
		emailVerified: false,
		password: password,
		displayName: `${firstName} ${lastName}`,
		disabled: false,
	}).then((userRecord) => {
		db.collection("users").doc(userRecord.uid).set({
			firstName,
			lastName,
			email,
			createdAt: new Date(),
		});
		console.log("Successfully created new user:", userRecord.uid);
		res.status(200).json({ message: "User created successfully", uid: userRecord.uid });
	}).catch((error) => {
		console.log("Error creating new user:", error);
		res.status(400).json({ message: "Error creating user", error: error.message });
	});
}

function login(req, res) {
	const { email, password } = req.body;
	
	auth.signInWithEmailAndPassword(email, password).then((userCredential) => {
		const user = userCredential.user;

		return res.status(200).json({ uid: user.uid, email: user.email });
	}).catch((error) => {
		return res.status(400).json({ error: error.message });
	});
}

module.exports = { register, login };