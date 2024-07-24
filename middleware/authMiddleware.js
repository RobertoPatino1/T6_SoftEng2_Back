const { auth } = require("../config/firebaseConfig");

exports.authenticate = async (req, res, next) => {
	const token = req.headers.authorization;
	return res.status(200).json({ token });
	if (!token) {
		return res.status(403).json({ error: "No token provided" });
	}

	try {
		const decodedToken = await auth.verifyIdToken(token);
		req.uid = decodedToken.uid;
		next();
	} catch (error) {
		return res.status(401).json({ error: "Unauthorized" });
	}
};
