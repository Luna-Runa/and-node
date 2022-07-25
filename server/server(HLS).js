const express = require("express");
const fs = require("fs").promises;
const app = express();
const path = require("path");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegInstaller = require("@ffmpeg-installer/ffmpeg");

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

ffmpeg("WinterSleep1080p.mp4", { timeout: 432000 })
  .addOptions([
    "-profile:v baseline", // baseline profile (level 3.0) for H264 video codec
    "-level 3.0",
    "-s 640x360", // 640px width, 360px height output video dimensions
    "-start_number 0", // start the first .ts segment at index 0
    "-hls_time 10", // 10 second segment duration
    "-hls_list_size 0", // Maxmimum number of playlist entries (0 means all entries/infinite)
    "-f hls", // HLS format
  ])
  .output("public/output.m3u8")
  .on("end", (err, stdout, stderr) => {
    console.log("ffmpeg end");
  })
  // .on("error", (err, stdout, stderr) => {
  //   console.log(err.message);
  //   console.log(`stdout : ${stdout}`);
  //   console.log(`stderr : ${stderr}`);
  // })
  .run();

// const __dirname = path.resolve();

// // Set static directory
// app.use(express.static(__dirname + "/public"));
app.use(express.static("public"));

// Index page
app.get("/", (req, res) => {
  res.redirect("/index.html");
});

app.get("/test", (req, res) => {
  var filePath = "./public/output.m3u8";
  var resolvedPath = path.resolve(filePath);
  console.log(resolvedPath);
  return res.sendFile(resolvedPath);
});

app.get("/test2", (req, res) => {
  var filePath = "./WinterSleep1080p.mp4";
  var resolvedPath = path.resolve(filePath);
  console.log(resolvedPath);
  return res.sendFile(resolvedPath);
});

app.listen(3000, () => {
  console.log("Server started");
});
