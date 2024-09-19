import express from "express";
import "dotenv/config";
import videosRoutes from "./routes/videos.js";
import cors from "cors";

const app = express();
const { BACKEND_URL, CORS_ORIGIN } = process.env;
const PORT = process.env.PORT || 5051;

console.log(PORT);
console.log(BACKEND_URL);
console.log(CORS_ORIGIN)

app.use(cors({ CORS_ORIGIN })); 
app.use("/videos", videosRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on ${BACKEND_URL}${PORT}`);
})   