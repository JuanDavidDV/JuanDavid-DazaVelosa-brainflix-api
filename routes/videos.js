import express from "express";
import fs from "fs";
import { v4 as uuidv4} from "uuid";

const router = express.Router(); //Enables Router use
router.use(express.json());

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

router.get("/", (req, res) => {
    res.status(200).json(videosDataParse);
})

export default router;