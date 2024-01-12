import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import filesRoutes from "./routes/files";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

connectDB();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(cors());
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use("/api/files", filesRoutes);

app.listen(PORT, () => console.log(`Server Started ${PORT}`));
