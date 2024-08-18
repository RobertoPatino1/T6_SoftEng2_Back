const { db } = require("../config/firebaseConfig");


async function saveRoute(req, res) {
  const { name, placesList, currentPlaceIndex,
    numberPeople, numberGuides, routeIsPublic,
    routeDate, startingPoint, startTime, endTime,
    image, description, hasStarted, routeType } = req.body;
  try {
    await db.collection("routes").doc().set({
      name,
      placesList,
      currentPlaceIndex,
      numberPeople,
      numberGuides,
      routeIsPublic,
      routeDate,
      startingPoint,
      startTime,
      endTime,
      image,
      description,
      hasStarted,
      routeType,
      createdAt: new Date(),
    });
    return res.status(200).json({ message: "Route created successfully" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

async function updateRoute(req, res) {
  const { route_id } = req.params;
  const { name, placesList, currentPlaceIndex,
    numberPeople, numberGuides, routeIsPublic,
    routeDate, startingPoint, startTime, endTime,
    image, description, hasStarted, routeType } = req.body;
  try {
    await db.collection("routes").doc(route_id).update({
      name,
      placesList,
      currentPlaceIndex,
      numberPeople,
      numberGuides,
      routeIsPublic,
      routeDate,
      startingPoint,
      startTime,
      endTime,
      image,
      description,
      hasStarted,
      routeType,
      updatedAt: new Date(),
    });
    return res.status(200).json({ message: "Route updated successfully" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

async function getRoutes(req, res) {
  const { visibility } = req.params;
  try {
    const routes = await db.collection("routes").get();
    console.log("Rutas encontradas: ", routes);
    const routesList = [];
    routes.forEach((doc) => {
      data = doc.data();
      if (visibility) {
        const v = visibility == "public";
        if (data.routeIsPublic == v) {
          data.id = doc.id;
          routesList.push(data);
        }
      } else {
        data.id = doc.id;
        routesList.push(data);
      }
    });
    return res.status(200).json(routesList);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
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

module.exports = { saveRoute, getRoute, getUserRoutes, getRoutes, updateRoute };