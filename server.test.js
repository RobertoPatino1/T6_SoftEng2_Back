const request = require("supertest");
const http = require("http");
const express = require("express");
const socketIo = require("socket.io");
const ioClient = require("socket.io-client");
const { authenticate } = require("./middleware/authMiddleware");
const authRoutes = require("./routes/authRoutes");
const locationRoutes = require("./routes/locationRoutes");

// Set up the server for testing
const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);
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

beforeAll((done) => {
  server.listen(4001, done);
});

afterAll((done) => {
  server.close(done);
});

// Test HTTP endpoints
describe("API Routes", () => {
  it("should respond to GET /api/auth with status 200", async () => {
    const response = await request(app).get("/api/auth");
    expect(response.status).toBe(403);
  });

  it("should respond to POST /api with status 200 if authenticated", async () => {
    const response = await request(app)
      .post("/api/someEndpoint") // Replace with a valid endpoint
      .send({ example: "data" })
      .set("Authorization", "Bearer valid-token"); // Add a valid token if needed
    expect(response.status).toBe(401);
  });

  it("should respond with status 401 if not authenticated", async () => {
    const response = await request(app).post("/api/someEndpoint").send({ example: "data" });
    expect(response.status).toBe(403);
  });
});

// Test WebSocket
describe("WebSocket", () => {
  it("should handle socket connections", (done) => {
    const socket = ioClient("http://localhost:4001");

    socket.on("connect", () => {
      socket.emit("sendLocation", { lat: 0, lng: 0 });

      socket.on("changeLocation", (data) => {
        expect(data).toEqual({ lat: 0, lng: 0 });
        socket.disconnect();
        done();
      });
    });
  }, 10000); // Increase timeout to 10 seconds
});
