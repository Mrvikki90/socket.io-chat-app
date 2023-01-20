// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });

// io.on("connection", (socket) => {
//   socket.on("joinRoom", (room) => socket.join(room));
//   socket.on("newMessage", ({ newMessage, room }) => {
//     io.in(room).emit("latestMessages", newMessage);
//   });
// });

// app.get("/", (req, res) => {
//   res.send("chat started");
// });
