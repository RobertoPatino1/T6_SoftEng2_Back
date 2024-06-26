const { auth } = require("../config/firebaseConfig");
const { db } = require("../config/firebaseConfig");

export async function register(req, res) {
	const { email, password, firstName, lastName } = req.body;
	auth = auth.getAuth();
	auth.createUserWithEmailAndPassword(email, password).then(async (userCredential) => {
		const user = userCredential.user;
		user_data = {
			"names": firstName,
			"lastnames": lastName,
			"email": email,
		}
		await setDoc(doc(db, "users", user.uid), user_data);

		return res.status(200).json({ uid: user.uid, email: user.email });
	}).catch((error) => {
		return res.status(400).json({ error: error.message });
	});

};

export async function login(req, res) {
	const { email, password } = req.body;

	auth.signInWithEmailAndPassword(email, password).then((userCredential) => {
		const user = userCredential.user;

		return res.status(200).json({ uid: user.uid, email: user.email });
	}).catch((error) => {
		return res.status(400).json({ error: error.message });
	});
}
