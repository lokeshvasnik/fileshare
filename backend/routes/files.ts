import express from "express";
import multer from "multer";
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import File from "../models/File";
import mongoose from "mongoose";
import https from "https";

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

//? @gets file

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }
    const file = await File.findById(id);

    try {
        if (!file) {
            return res.status(404).json({ messsage: "Not Exist" });
        }
        const { filename, format, sizeInBytes } = file;
        return res.status(200).json({
            name: filename,
            sizeInBytes,
            format,
            id,
        });
    } catch (error) {
        return res.status(500).json({ message: "Server Error" });
    }
});

//? #downloads file
router.get("/:id/download", async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }

    try {
        const file = await File.findById(id);

        if (!file) {
            return res.status(404).json({ message: "Not Exist" });
        }

        // Use optional chaining to check if file and secure_url are not undefined
        https.get(file?.secure_url, (fileStream) => fileStream.pipe(res));
    } catch (error) {
        return res.status(500).json({ message: "Server Error" });
    }
});

export default router;
