import express from "express";
import fs from "fs";
import { v4 as uuidv4} from "uuid";

const router = express.Router(); //Enables Router use
router.use(express.json());

const videosData = fs.readFileSync("./data/videos.json");   //Retrieves data from videos.json file
const videosDataParse = JSON.parse(videosData);     //Parsed video data

router.get("/:id", (req, res) => {
    const videoId = req.params.id;
    const selectVideo = videosDataParse.find((video) => video.id === videoId);
    res.status(200).json(selectVideo);
});

router.get("/", (req, res) => {
    res.status(200).json(videosDataParse.map((video) => ({
        id: video.id,
        title: video.title,
        channel: video.channel,
        image: video.image
    })));
});

export default router;