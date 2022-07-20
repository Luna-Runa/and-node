import express from "express";
import path from "path";
import { Server } from "socket.io";
import { createServer } from "http";
//import multer from "multer";
import fs from "fs";
import cors from "cors";
import webSocket from "./socket.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));

const server = createServer(app);
webSocket(server);
const io = new Server(server, { cors: { origin: "*", credentials: true } });

//out = multer({ dest: "uploads/" });

const __dirname = path.resolve();

let id = 1;
let clients = [];

app.get("/", (req, res) => {
  res.send("hello?");
});

// app.get("/cooking", (req, res) => {
//   user[0][1];
//   if (user[0][1] === "cook") setTimeout(cooking, 1000);
//   res.send(`${user}`);
// });

// app.get("/img", (req, res) => {
//   let filename = "1.jpg";
//   fs.readFile(filename, (err, data) => {
//     res.writeHead(200, { "Context-Type": "image/jpg" });
//     res.write(data);
//     res.end();
//   });
// });

// app.post("/order", (req, res) => {
//   console.log(req.body);

//   res.send("Order completed");
// });

function cooking(socket, client) {
  setTimeout(() => {
    client.state = process.env.IMAGE_1;
    socket.emit("getState", client);
  }, 500);

  setTimeout(() => {
    client.state = process.env.IMAGE_2;
    socket.emit("getState", client);
  }, 2000);

  setTimeout(() => {
    client.state = process.env.IMAGE_3;
    socket.emit("getState", client);
  }, 4000);
}

io.on("connection", (socket) => {
  socket.emit("hello", io.engine.clientsCount);

  // on 함수로 이벤트를 정의해 신호를 수신할 수 있다.
  socket.on("order", (data) => {
    let client = {};
    client.socketId = socket.id;
    client.id = id++;
    if (data.soup && data.topping) {
      client.soup = data.soup;
      client.topping = data.topping;
    }

    client.state = process.env.IMAGE_0;
    clients.push(client);
    cooking(socket, client);

    // io.emit : 연결된 모든 소켓에게
    //io.emit("process", clients.state);
    // io.sockets.socket(client.id).send() : client.id 에게만
    socket.emit("getState", client);
  });

  // let filename = "1.jpg";
  // fs.readFile(filename, (err, data) => {
  //   console.log(data);
  //   socket.emit("hello", data);
  // });

  socket.on("disconnect", () => {});
});

server.listen(4000, () => console.log("app start http://127.0.0.1:4000/"));
