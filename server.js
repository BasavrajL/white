const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve the front-end files
app.use(express.static(__dirname + "/public"));

// Handle socket connection
io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle drawing data from clients
  socket.on("drawing", (data) => {
    // Broadcast the drawing to all other clients
    socket.broadcast.emit("drawing", data);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
