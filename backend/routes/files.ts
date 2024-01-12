import express from "express";
import multer from "multer";
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import File from "../models/File";

const router = express.Router();
const storage = multer.diskStorage({});

let upload = multer({
    storage,
});

//? @handles file upload
router.post("/upload", upload.single("myFile"), async (req, res) => {
    try {
        if (!req.file) {
            return res.json({ error: "Bro!!! file is required" });
        }

        const { originalname } = req.file;

        let uploadedFile: UploadApiResponse;

        try {
            uploadedFile = await cloudinary.uploader.upload(req.file.path, {
                use_filename: true, // not working
                folder: "shareme",
                resource_type: "auto", // for all type of files
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ messages: error });
        }

        const { secure_url, bytes, format } = uploadedFile;
        const file = await File.create({
            filename: originalname,
            sizeInBytes: bytes,
            secure_url,
            format,
        });

        return res.status(200).json({
            id: file._id,
            downloadPageLink: `${process.env.API_BASE_ENDPOINT_CLIENT}/download/${file._id}`,
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({ messages: "Server Error :(" });
    }
});

export default router;
