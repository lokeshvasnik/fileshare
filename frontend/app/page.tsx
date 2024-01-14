"use client";
import DownloadFile from "@/components/shared/DownloadFile";
import DropZone from "@/components/shared/DropZone";
import FileDetails from "@/components/shared/FileDetails";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { FileUp } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";

axios.defaults.baseURL = "http://localhost:8800/";

export default function Home() {
    const [file, setFile] = useState<File | null>(null);
    const [id, setId] = useState(null);
    const [downloadPageLink, setDownloadPageLink] = useState(null);
    const [uploadState, setUploadState] = useState<
        "Uploading" | "Upload Failed" | "Uploaded" | "Upload"
    >("Upload");

    const handleUploadHandler = async () => {
        if (uploadState === "Uploading") return;
        setUploadState("Uploading");
        const formData = new FormData();

        if (file) {
            formData.append("myFile", file);
        }

        try {
            const { data } = await axios({
                method: "post",
                data: formData,
                url: "api/files/upload",
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            toast.success("File Uploaded Successfully!");
            setUploadState("Uploaded");
            setDownloadPageLink(data.downloadPageLink);
            setId(data.id);
        } catch (error) {
            console.log(error);
            toast.error("File Not Uploaded!");
            setUploadState("Upload Failed");
            throw new Error("Error");
        }
    };

    const resetComponentHandler = () => {
        setFile(null);
        setDownloadPageLink(null);
        setUploadState("Upload");
    };

    return (
        <div className="flex justify-center items-center flex-col py-10">
            <div className="flex justify-center items-center flex-col space-y-5">
                <h1 className="text-5xl uppercase font-bold">
                    Simple and reliable file transfers
                </h1>
                <div>
                    {!downloadPageLink && (
                        <DropZone setFile={setFile} file={file} />
                    )}

                    {file && (
                        <FileDetails
                            file={{
                                name: file?.name,
                                sizeInBytes: file?.size,
                            }}
                        />
                    )}
                </div>
                {!downloadPageLink && file && (
                    <Button onClick={handleUploadHandler}>
                        <span className="mx-1">
                            <FileUp />
                        </span>
                        {uploadState}
                    </Button>
                )}

                {downloadPageLink && (
                    <div>
                        <DownloadFile downloadPageLink={downloadPageLink} />
                        <Button onClick={resetComponentHandler}>
                            Upload New File
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
