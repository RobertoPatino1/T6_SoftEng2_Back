const { db } = require("../config/firebaseConfig");

async function getUserData(req, res) {
  const { user_id } = req.params;
  try {
    const user = await db.collection("users").doc(user_id).get();
    if (!user.exists) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({ user: user.data() });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

async function updateUser(req, res) {
  const { user_id } = req.params;
  const { name, email, phone,
    profile_picture, background_picture,
    birthdate, bio } = req.body;

  try {
    await db.collection("users").doc(user_id).update({
      name, email, phone, profile_picture,
      background_picture, birthdate, bio
    });
    return res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}


module.exports = { getUserData };