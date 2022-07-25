import express from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";
import { createServer } from "http";
import rtsp from "node-rtsp-stream";

dotenv.config();
const app = express();
const __dirname = path.resolve();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors({ origin: true, credentials: true }));

const server = createServer(app);
const io = new Server(server, { cors: { origin: "*", credentials: true } });

const Stream = rtsp;
const streamUrl =
  "rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov";

const stream = new Stream({
  name: "name",
  streamUrl: streamUrl,
  wsPort: 9999,
  width: 240,
  height: 160,
  ffmpegOptions: {
    // options ffmpeg flags
    "-stats": "", // an option with no neccessary value uses a blank string
    "-r": 30, // options with required values specify the value after the key
  },
});

io.on("connection", function (socket) {
  var pipeStream = function (data) {
    socket.emit("data", data.toString("base64"));
  };
  stream.on("data", pipeStream);
  socket.on("disconnect", function () {
    stream.removeListener("data", pipeStream);
  });
});

app.get("/", (req, res) => {
  res.send("hello????????????????????????????????");
});

app.get("/rtsp", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/test_client.html"));
});

server.listen(process.env.PORT, () =>
  console.log(`app start http://127.0.0.1:${process.env.PORT}/`)
);
