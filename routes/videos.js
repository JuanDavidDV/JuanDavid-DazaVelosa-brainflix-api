import express from "express";
import fs from "fs";
import { v4 as uuidv4} from "uuid";

const router = express.Router(); //Enables Router use

const videosData = fs.readFileSync("./data/videos.json");   //Retrieves data from videos.json file
const videosDataParse = JSON.parse(videosData);     //Parsed video data

const syncVideosData = (data) => {
    fs.writeFileSync("./data/videos.json", JSON.stringify(data));
}

router.get("/:id", (req, res) => {
    const videoId = req.params.id;
    const selectVideo = videosDataParse.find((video) => video.id === videoId);
    res.status(200).json(selectVideo);
});

router.route("/")
    .get((req, res) => {
        res.status(200).json(videosDataParse.map((video) => ({
            id: video.id,
            title: video.title,
            channel: video.channel,
            image: video.image
        })));
    })
    .post((req, res) => {
        const { title, image, description } = req.body;
        const newVideo = {
            id: uuidv4(),
            title: title,
            channel: "Mohan Muruge",
            image: image? image: "http://localhost:8080/images/Upload-video-preview.jpg",
            description: description,
            views: "0",
            likes: "0",
            duration: "5:30",
            video: "https://unit-3-project-api-0a5620414506.herokuapp.com/stream",
            timestamp: Date.now(),
            comments: []
        }
        videosDataParse.push(newVideo);
        syncVideosData(videosDataParse);
        res.status(200).json(newVideo);
    });

export default router;

