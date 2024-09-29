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
    if(!selectVideo) {
        res.status(404).json({
            message: "Video ID does not exist. Please try a different ID"
        })
    } else {
        res.status(200).json(selectVideo);
    }
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
            video: "http://localhost:8080/video/BrainStation_Sample_Video.mp4",
            timestamp: Date.now(),
            comments: []
        }
        videosDataParse.push(newVideo);
        syncVideosData(videosDataParse);
        res.status(200).json(newVideo);
    });

router.post("/:id/comments", (req, res) => {
    const videoId = req.params.id;
    const { name, comment } = req.body;
    const currentVideo = videosDataParse.find((video) => video.id === videoId);
    const newComment = {
        id: uuidv4(),
        name: name,
        comment: comment,
        likes: 0,
        timestamp: Date.now()
    };

    currentVideo.comments.push(newComment);
    syncVideosData(videosDataParse);
    res.status(200).json(newComment);
});

 router.delete("/:videoId/comments/:commentId", (req, res) => {
     const videoId = req.params.videoId;
     const commentId = req.params.commentId;

     const currentVideo = videosDataParse.find((video) => video.id === videoId);
     const currentCommentDelete = currentVideo.comments.splice(
        currentVideo.comments.findIndex((comment) => comment.id === commentId), 1) [0]; //[0] returns the body of the comment deleted
    
    syncVideosData(videosDataParse);
    res.status(200).json(currentCommentDelete);
 });

 router.put("/:videoId/likes", (req, res) => {
    const videoId = req.params.videoId;
    const currentVideo = videosDataParse.find((video) => video.id === videoId);
    currentVideo.likes = (parseInt(currentVideo.likes.replaceAll(",", "")) + 1).toLocaleString("en-us");
    syncVideosData(videosDataParse);
    res.status(200).json(currentVideo.likes);
 });

export default router;

