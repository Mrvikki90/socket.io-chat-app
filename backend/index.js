const express = require("express");
const { Server } = require("socket.io");
const cors = require("cors");
const http = require("http");
var bodyParser = require("body-parser");
const db = require("./database/database");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
require("./routes/routes")(app);
require("./routes/conversation")(app);
require("./routes/messages")(app);

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let usersArray = [];
const addUsers = (userId, sockeId) => {
  !usersArray.some((user) => user.userId === userId) &&
    usersArray.push({ userId, sockeId });
};

const removeUsers = (sockeId) => {
  return usersArray.filter((user) => user.sockeId !== sockeId);
};

const getUsers = (userId) => {
  return usersArray.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  console.log("user connected connected ", socket.id);
  io.emit("welcome", "welcome this a socket server");
  socket.on("addUser", (userId) => {
    addUsers(userId, socket.id);
    io.emit("getUsers", usersArray);
  });

  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUsers(receiverId);
    io.to(user.sockeId).emit("getMessage", {
      senderId,
      text,
    });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    removeUsers(socket.id);
    io.emit("getUsers", usersArray);
  });

  socket.on("joinRoom", (room) => {
    console.log(room);
    socket.join(room.room);
    socket.broadcast.in(room.room).emit("welcome", { username: room.name });
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
