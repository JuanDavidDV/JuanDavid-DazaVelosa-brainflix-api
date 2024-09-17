import express from "express";
import fs from "fs";

const router = express.Router(); //Enables Router use

const readAllVideosData = (videoId) => {
    const videosData = fs.readFileSync("./data/videos.json");
    const videosDataParse = JSON.parse(videosData);
    const selectVideo = videosDataParse.find((video) => video.id === videoId);
    console.log(selectVideo);
    return selectVideo;
}

router.get("/:videoId", (req, res) => {
    const videoId = req.params.videoId;
    console.log(videoId);
    const allVideosData = readAllVideosData(videoId);
    //console.log(allVideosData);
    return res.json(allVideosData);
});

export default router;