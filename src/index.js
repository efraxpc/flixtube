const express = require("express");
const fs = require("fs");
const path = require("path");


//
// Extracts the PORT environment variable.
//
const PORT = process.env.PORT;

const app = express();

//
// Registers a HTTP GET route for video streaming.
//
app.get("/video", async (req, res) => {
    const videoPath = path.join(__dirname, "../videos/SampleVideo_1280x720_1mb.mp4");
    const stats = await fs.promises.stat(videoPath);

    res.writeHead(200, {
        "Content-Length": stats.size,
        "Content-Type": "video/mp4",
    });
    fs.createReadStream(videoPath).pipe(res);
});

//
// Starts the HTTP server.
//
app.listen(PORT, () => {
    console.log(`Microservice listening on port ${PORT}, point your browser at http://localhost:${PORT}/video`);
});
