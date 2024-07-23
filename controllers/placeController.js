const { db, admin } = require("../config/firebaseConfig");

exports.getPlaces = async (req, res) => {
  try {
    const places = await db.collection("places").get();
    const placesList = [];
    places.forEach((doc) => {
      placesList.push(doc.data());
    });
    return res.status(200).json(placesList);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.getPlace = async (req, res) => {
  const { place } = req.params;
  try {
    const place_db = await db.collection("places").doc(place).get();
    if (!place_db.exists) {
      place_db = await db.collection("places").where("place_name", "==", place).get();
      if (place_db.empty) {
        return res.status(404).json({ error: "Place not found" });
      }else {
        return res.status(200).json(place_db.data());
      }
    }
    return res.status(200).json(place_db.data());
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.savePlace = async (req, res) => {
  const { place_name, place_description, place_location } = req.body;
  try {
    await db.collection("places").doc().set({
      place_name,
      place_description,
      place_geopoint: new admin.firestore.GeoPoint(place_location.latitude, place_location.longitude),
      createdAt: new Date(),
    });
    return res.status(200).json({ message: "Place created successfully" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};