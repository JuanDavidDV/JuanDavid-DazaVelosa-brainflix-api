import express from "express";
import fs from "fs";

const router = express.Router(); //Enables Router use

const readAllVideosData = () => {
    const videosData = fs.readFileSync("../data/videos.json");
    const videosDataParse = JSON.parse(videosData);
    return videosDataParse;
}

router.get("/:videoId", (req, res) => {
    const allVideosData = readAllVideosData();
    console.log(allVideosData);
    return res.json(allVideosData);
});

export default router;