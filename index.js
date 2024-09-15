import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();

app.use(cors());

const readAllVideosData = () => {
    const videosData = fs.readFileSync("./data/videos.json");
    const videosDataParsed = JSON.parse(videosData);
    return videosDataParsed;
}


app.get("/", (req, res) => {
    const allVideosData = readAllVideosData();
    res.json(allVideosData);
})

app.listen(8080, () => {
    console.log("Server is running on http://localhost:8080 ");
})