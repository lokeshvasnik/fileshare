import React from "react";
const DownloadFile = ({ downloadPageLink }: any) => {
    return (
        <div className="flex flex-col items-center justify-center py-3 space-y-4 bg-gray-800 rounded-md shadow-xl w-96">
            <span>oops! File does not exist! check the URL</span>

            <img
                src="/tongue.svg"
                alt="download_image"
                className="w-16 h-16"
                onClick={() => navigator.clipboard.writeText(downloadPageLink)}
            />
            <h1 className="text-xl">Your file is ready to be downloaded</h1>
            <span>{downloadPageLink}</span>
        </div>
    );
};

export default DownloadFile;
