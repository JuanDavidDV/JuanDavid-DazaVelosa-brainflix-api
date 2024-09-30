import express from "express";
import "dotenv/config";
import videosRoutes from "./routes/videos.js";
import cors from "cors";

const app = express();
const { BACKEND_URL, CORS_ORIGIN } = process.env;
const PORT = process.env.PORT || 5051;

app.use(cors({ CORS_ORIGIN })); 
app.use(express.json());    //Middleware to parse JSON on body-parser
app.use(express.static("./public"));    // creates static asset for public folder containing the images and video
app.use("/videos", videosRoutes);   //Incorporates routes for videos

app.listen(PORT, () => {
    console.log(`Server is running on ${BACKEND_URL}${PORT}`);
})   