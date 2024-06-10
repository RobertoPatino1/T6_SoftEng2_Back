const express = require("express");
const router = express.Router();
const { updateLocation } = require("../controllers/locationController");
const { authenticate } = require("../middleware/authMiddleware");

router.post("/location", authenticate, updateLocation);

module.exports = router;
