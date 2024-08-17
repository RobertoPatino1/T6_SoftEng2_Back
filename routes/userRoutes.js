const express = require("express");
const router = express.Router();

const { getUserData, updateUser } = require("../controllers/userController");

router.get("/:user_id", getUserData);
router.put("/:user_id", updateUser);

module.exports = router;