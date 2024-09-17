import express from "express";
import videosRoutes from "./routes/videos.js";
import cors from "cors";

const app = express();

app.use(cors());


app.listen(8080, () => {
    console.log("Server is running on http://localhost:8080");
})