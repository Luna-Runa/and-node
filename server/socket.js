import http from "http";
import { Server } from "socket.io";

let interval = 3000;

export default function webSocket(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });
  io.on("connection", (socket) => {
    console.log("New client connected");
    socket.on("disconnect", () => console.log("user disconnect", socket.id));
    socket.on("reply", (data) => {
      console.log(data);
    });
    setInterval(() => {
      socket.emit("FromAPI", sortConverter.sortData());
    }, interval);
  });
}
