const express = require('express');
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const PORT = 5000;

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
});

io.on("connection", (socket) => {
    console.log(socket.id);

    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
    });
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));

// app.get('/test', (req, res) => {
//   res.send({ express: 'EXPRESS BACKEND SUCCESSFULLY CONNECTED TO REACT'});
// });