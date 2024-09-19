import express from "express";
import fs from "fs";

const router = express.Router(); //Enables Router use

const readAllVideosData = (videoId) => {
    const videosData = fs.readFileSync("./data/videos.json");
    const videosDataParse = JSON.parse(videosData);
    const selectVideo = videosDataParse.find((video) => video.id === videoId);  //DO I NEED TO USE THE FIND FUNCTION IN MY BACK END OR FRONT END?
    console.log(selectVideo);
    return selectVideo;
}

router.get("/:videoId", (req, res) => {
    const videoId = req.params.videoId;
    const allVideosData = readAllVideosData(videoId);
    res.status(200).json(allVideosData);
});

export default router;