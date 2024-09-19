import express from "express";
import fs from "fs";

const router = express.Router(); //Enables Router use

const videosData = fs.readFileSync("./data/videos.json");   //Retrieves data from videos.json file
const videosDataParse = JSON.parse(videosData);     //Parsed video data

const readAllVideosData = (videoId) => {
    const selectVideo = videosDataParse.find((video) => video.id === videoId);  //DO I NEED TO USE THE FIND FUNCTION IN MY BACK END OR FRONT END?
    console.log(selectVideo);
    return selectVideo;
}

router.get("/:videoId", (req, res) => {
    const videoId = req.params.videoId;
    const allVideosData = readAllVideosData(videoId);
    res.status(200).json(allVideosData);
});

const nextVideoList = () => {
    const nextVideos = videosDataParse.filter(())
}

router.get("/", (req, res) => {

})

export default router;