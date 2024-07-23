const { db, admin } = require("../config/firebaseConfig");

async function saveRoute(req, res) {
  const { creator_uid, route_name, route_description, route_distance, route_duration, route_locations } = req.body;
  console.log("body: ", req.body);
  var route_geopoints = route_locations.map((location) => new admin.firestore.GeoPoint(location.latitude, location.longitude));
  db.collection("routes").doc().set({
    creator_uid,
    route_name,
    route_description,
    route_distance,
    route_duration,
    route_geopoints,
    createdAt: new Date(),
  }).then((route_id) => {
    console.log("Route created successfully: ", route_id);
    res.status(200).json({ message: "Route created successfully" });
  }).catch((error) => {
    res.status(400).json({ error: error.message });
  });

}

async function getRoute(req, res) {
  const { route_id } = req.params;
  try {
    const route = await db.collection("routes").doc(route_id).get();
    if (!route.exists) {
      return res.status(404).json({ error: "Route not found" });
    }
    console.log("Ruta encontrada: ", route.data());
    return res.status(200).json(route.data());
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

async function getUserRoutes(req, res) {
  const { uid } = req.params;
  try {
    const routes = await db.collection("users").doc(uid).get();
    if (!routes.exists) {
      return res.status(404).json({ error: "User not found" });
    }
    data = routes.data();
    console.log("Rutas encontradas: ", data.routes);
    return res.status(200).json(data.routes);
  }
  catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

module.exports = { saveRoute, getRoute, getUserRoutes };