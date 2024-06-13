const express = require("express");
const router = express.Router();
const { auth } = require("../config/firebaseConfig");

router.post("/register", async (req, res) => {
	const { email, password } = req.body;

	try {
		const userRecord = await auth.createUser({
			email,
			password,
		});

		res
			.status(201)
			.json({ message: "User created successfully", user: userRecord });
	} catch (error) {
		res
			.status(400)
			.json({ message: "Error creating user", error: error.message });
	}
});

router.post("/login", async (req, res) => {
	const { email, password } = req.body;

	try {
		const userRecord = await auth.getUserByEmail(email);

		//TODO: En producción, usa una función de Firebase Cloud para devolver un token personalizado
		//AQUI SOLO SE PERMITE EL LOGIN TOMANDO EN CUENTA EL EMAIL, SE IGNORA EL PASSWORD PARA FACILIDADES DE PRUEBA
		const token = await auth.createCustomToken(userRecord.uid);

		res.status(200).json({ message: "Login successful", token });
	} catch (error) {
		res.status(400).json({ message: "Error logging in", error: error.message });
	}
});

module.exports = router;
