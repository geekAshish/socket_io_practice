import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

interface UserDetailsInterface {
  name: string;
  score: string;
  id: string;
}

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

const playerDetails: UserDetailsInterface[] = [];

io.on("connection", (socket) => {
  socket.on("send-player-details", (player_details) => {
    playerDetails.push({ ...player_details, id: socket.id });

    socket.emit("player-score-to-client", playerDetails);

    setInterval(() => {
      socket.emit("player-score-to-client", playerDetails);
    }, 5000);
  });

  socket.on("edit-player-details", (update_details) => {
    console.log(update_details);
    // edit in database
  });
});

httpServer.listen(3000, () => {
  console.log("server is connected");
});
