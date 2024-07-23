const express = require("express");
const router = express.Router();

const { getPlaces, getPlace, savePlace, updatePlace, deletePlace } = require("../controllers/placeController");


router.get("/", getPlaces);
router.get("/:place_uid", getPlace);
router.post("/savePlace", savePlace);
router.put("/updatePlace", updatePlace);
router.delete("/deletePlace", deletePlace);

module.exports = router;
