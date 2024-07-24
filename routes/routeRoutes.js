const express = require("express");
const router = express.Router();
const { saveRoute, getRoute, getUserRoutes, getRoutes } = require("../controllers/routeController");

router.post("/saveRoute", saveRoute);
router.get("/all/:visibility", getRoutes);
router.get("/all", getRoutes);
router.get("/getUserRoutes/:uid", getUserRoutes);
router.get("/:route_uid", getRoute);

module.exports = router;