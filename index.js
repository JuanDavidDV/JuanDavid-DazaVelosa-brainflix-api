import express from "express";
import axios from "axios";

const app = express();

app.listen(8080, () => {
    console.log("Server is running on http://localhost:8080 ");
})