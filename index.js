const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const locationRoutes = require("./routes/locationRoutes");
const routeRoutes = require("./routes/routeRoutes");
const userRoutes = require("./routes/userRoutes");
const { authenticate } = require("./middleware/authMiddleware");

dotenv.config();


const PORT = process.env.PORT || 4001;
const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/routes", routeRoutes);
app.use("/api/users", userRoutes);
app.use("/api", authenticate, locationRoutes);
app.use(express.static("public"));

const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", (socket) => {
	console.log("Client connected");

	socket.on("sendLocation", (data) => {
		console.log("Received location:", data);
		io.emit("changeLocation", data);
	});

	socket.on("disconnect", () => {
		console.log("Client disconnected");
	});
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));


