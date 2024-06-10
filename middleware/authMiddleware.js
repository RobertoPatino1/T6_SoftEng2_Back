const { admin } = require("../services/firebase");

const authenticate = async (req, res, next) => {
	const token = req.header("Authorization").replace("Bearer ", "");

	try {
		const decodedToken = await admin.auth().verifyIdToken(token);
		req.user = decodedToken;
		next();
	} catch (error) {
		res.status(401).json({ message: "Unauthorized" });
	}
};

module.exports = { authenticate };
