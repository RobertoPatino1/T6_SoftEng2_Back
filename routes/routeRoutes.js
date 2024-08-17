const express = require("express");
const router = express.Router();
const { saveRoute, getRoute, getUserRoutes, getRoutes, updateRoute } = require("../controllers/routeController");

router.post("/save", saveRoute);
router.put("/update/:route_uid", updateRoute);
router.get("/all/:visibility", getRoutes);
router.get("/all", getRoutes);
router.get("/getUserRoutes/:uid", getUserRoutes);
router.get("/:route_uid", getRoute);

module.exports = router;