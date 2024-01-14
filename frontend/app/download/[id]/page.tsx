"use client";
import FileDetails from "@/components/shared/FileDetails";
import { Button } from "@/components/ui/button";
import axios from "axios";
import fileDownload from "js-file-download";

async function getData() {
    const res = await fetch(
        `http://localhost:8800/api/files/65a3c978e36a5df19d3aa1fc`
    );

    const data = await res.json();
    if (!res) {
        throw new Error("Failed to fetch data");
    }

    return data;
}

const DownloadPage = async () => {
    const { id, format, name, sizeInBytes } = await getData();

    const handleDownload = async () => {
        const { data } = await axios.get(
            `http://localhost:8800/api/files/${id}/download`,
            {
                responseType: "blob",
            }
        );

        fileDownload(data, name);
    };

    return (
        <div className="mx-40">
            <FileDetails file={{ format, name, sizeInBytes }} />
            <Button onClick={handleDownload}>Download File</Button>
        </div>
    );
};

export default DownloadPage;
