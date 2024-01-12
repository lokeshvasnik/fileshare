import express from "express";
import multer from "multer";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import File from "../models/File";

const router = express.Router();
const storage = multer.diskStorage({});

const upload = multer({
    storage,
});

router.post("/upload", upload.single("myFile"), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "File Needed" });

        console.log(req.file);

        try {
            await cloudinary.uploader.upload(req.file.path, {
                folder: "shareme",
                resource_type: "auto",
            });
        } catch (error) {
            res.status(400).json({ message: "Cloudinary Error" });
        }

        let uploadedfile: UploadApiResponse;
        const { originalname } = req.file;
        const { secure_url, bytes, format } = uploadedfile;

        const file = await File.create({
            filename: originalname,
            sizeInBytes: bytes,
            secure_url,
            format,
        });

        res.status(200).json(file);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error: " });
    }
});

export default router;
