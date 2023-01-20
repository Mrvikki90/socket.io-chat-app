const express = require("express");
const { Server } = require("socket.io");
const cors = require("cors");
const http = require("http");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("joinRoom", (room) => {
    socket.emit("joined_room", room);
    socket.join(room);
  });
  socket.on("newMessage", ({ newMessage, room }) => {
    console.log(newMessage, room);
    io.in(room).emit("latestMessages", newMessage);
  });
});

app.get("/", (req, res) => {
  res.send("chat started");
});

server.listen(8000, () => console.log("server is started at port 8000"));
