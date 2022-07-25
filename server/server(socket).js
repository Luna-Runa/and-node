import express from "express";
import path from "path";
import { Server } from "socket.io";
import { createServer } from "http";
//import multer from "multer";
import fs from "fs";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));

const server = createServer(app);
const io = new Server(server, { cors: { origin: "*", credentials: true } });

//out = multer({ dest: "uploads/" });

const __dirname = path.resolve();

let id = 1;
let clients = [];

app.get("/", (req, res) => {
  res.send("hello?");
});

function cooking(socket, client) {
  console.log(`cooking start : ${client.socketId}`);
  client.state = process.env.IMAGE_0;
  socket.emit("getState", client);

  setTimeout(() => {
    client.state = process.env.IMAGE_1;
    socket.emit("getState", client);
  }, 500);

  setTimeout(() => {
    client.state = process.env.IMAGE_2;
    socket.emit("getState", client);
  }, 1500);

  setTimeout(() => {
    client.state = process.env.IMAGE_3;
    socket.emit("getState", client);
  }, 2500);
}

io.on("connection", (socket) => {
  socket.emit("hello", io.engine.clientsCount);

  // on 함수로 이벤트를 정의해 신호를 수신할 수 있다.
  socket.on("order", (data) => {
    let client = {};
    client.socketId = socket.id;
    client.id = id++;
    client.soup = data[0].soup;
    client.topping = data[0].topping;

    clients.push(client);
    cooking(socket, client);

    // io.emit : 연결된 모든 소켓에게
    //io.emit("process", clients.state);
    // io.sockets.socket(client.id).send() : client.id 에게만
  });

  // let filename = "1.jpg";
  // fs.readFile(filename, (err, data) => {
  //   console.log(data);
  //   socket.emit("hello", data);
  // });

  socket.on("disconnect", () => {});
});

server.listen(process.env.PORT, () =>
  console.log(`app start http://127.0.0.1:${process.env.PORT}/`)
);
