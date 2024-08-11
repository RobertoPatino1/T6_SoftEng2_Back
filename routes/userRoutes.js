const express = require("express");
const router = express.Router();

const { getUserData } = require("../controllers/userController");

router.get("/:user_id", getUserData);