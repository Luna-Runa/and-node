const ffmpeg = require("fluent-ffmpeg");
const ffmpegInstaller = require("@ffmpeg-installer/ffmpeg");

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

// ffmpeg("sample.mp4", { timeout: 432000 })
//   .addOptions([
//     "-profile:v baseline",
//     "-level 3.0",
//     "-start_number 0",
//     "-hls_time 10",
//     "-hls_list_size 0",
//     "-f hls",
//   ])
//   .output("videos/output.m3u8")
//   .on("end", () => {
//     console.log("end");
//   })
//   .run();

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
    console.log("end");
  })
  // .on("error", (err, stdout, stderr) => {
  //   console.log(err.message);
  //   console.log(`stdout : ${stdout}`);
  //   console.log(`stderr : ${stderr}`);
  // })
  .run();
