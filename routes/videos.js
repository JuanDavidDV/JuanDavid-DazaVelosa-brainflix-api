import express from "express";
import fs from "fs";
import { v4 as uuidv4} from "uuid"; //Generates random ID

const router = express.Router(); //Enables Router use

const videosData = fs.readFileSync("./data/videos.json");   //Retrieves data from videos.json file
const videosDataParse = JSON.parse(videosData);     //Parsed video data

//Function created to modify JSON video data 
const syncVideosData = (data) => {
    fs.writeFileSync("./data/videos.json", JSON.stringify(data));
}

//Gets video information according to video Id
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
    .get((req, res) => {    //Gets Next Video response  
        res.status(200).json(videosDataParse.map((video) => ({ //Creates an object to send response with specific keys and values 
            id: video.id,
            title: video.title,
            channel: video.channel,
            image: video.image
        })));
    })
    .post((req, res) => {   //Posts new video uploaded by user into JSON video data file
        const { title, imageUrl, description } = req.body;
        const newVideo = {  //Creates object containing all video information
            id: uuidv4(),   //Generates new ID for new post video
            title: title,
            channel: "Mohan Muruge",
            image: imageUrl ? imageUrl : "http://localhost:8080/images/Upload-video-preview.jpg",   //If user does not provide image file, it will provide default upload video image
            description: description,
            views: "0",
            likes: "0",
            duration: "5:30",
            video: "http://localhost:8080/video/BrainStation_Sample_Video.mp4",
            timestamp: Date.now(),
            comments: []
        };

        videosDataParse.push(newVideo); //Adds new object into array JSON video data
        syncVideosData(videosDataParse);
        res.status(200).json(newVideo);
    });

//Posts a comment to respective video Id
router.post("/:id/comments", (req, res) => {
    const videoId = req.params.id;
    const { name, comment } = req.body;
    const currentVideo = videosDataParse.find((video) => video.id === videoId); //Selects current Video Id
    const newComment = {
        id: uuidv4(),   //Generates random comment ID
        name: name,
        comment: comment,
        likes: 0,
        timestamp: Date.now()
    };

    currentVideo.comments.push(newComment); //Adds comment to into comment array
    syncVideosData(videosDataParse);
    res.status(200).json(newComment);
});

//Deletes comment on specific video according to video ID
 router.delete("/:videoId/comments/:commentId", (req, res) => { 
     const videoId = req.params.videoId;
     const commentId = req.params.commentId;

     const currentVideo = videosDataParse.find((video) => video.id === videoId);    //Selects current Video Id
     const currentCommentDelete = currentVideo.comments.splice(
        currentVideo.comments.findIndex((comment) => comment.id === commentId), 1) [0]; //[0] returns the body of the comment deleted
    
    syncVideosData(videosDataParse);
    res.status(200).json(currentCommentDelete);
 });

 //Increments video Likes count according to video id
 router.put("/:videoId/likes", (req, res) => {
    const videoId = req.params.videoId;
    const currentVideo = videosDataParse.find((video) => video.id === videoId); //Selects current Video Id
    currentVideo.likes = (parseInt(currentVideo.likes.replaceAll(",", "")) + 1).toLocaleString("en-us");
    syncVideosData(videosDataParse);
    res.status(200).json(currentVideo.likes);
 });

export default router;

