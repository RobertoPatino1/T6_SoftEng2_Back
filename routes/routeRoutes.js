const express = require("express");
const router = express.Router();
const { saveRoute, getRoute, getUserRoutes } = require("../controllers/routeController");

router.post("/saveRoute", saveRoute);
router.get("/:route_uid", getRoute);
router.get("/getUserRoutes/:uid", getUserRoutes);

module.exports = router;