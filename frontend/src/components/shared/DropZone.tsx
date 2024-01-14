"use client";
import { Folder } from "lucide-react";
import Image from "next/image";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const DropZoneComponent = ({ setFile, file }: any) => {
    const onDrop = useCallback((acceptedFiles: any) => {
        setFile(acceptedFiles[0]);
    }, []);

    const {
        getRootProps,
        getInputProps,
        isDragAccept,
        isDragReject,
        isDragActive,
    } = useDropzone({
        onDrop,
        multiple: false,
        accept: {
            "image/jpeg": [],
            "image/png": [],
        },
    });

    return (
        <div className="w-full p-4">
            <div
                {...getRootProps()}
                className="w-full rounded-md cursor-pointer h-80 focus:outline-none"
            >
                <input {...getInputProps()} />

                <div
                    className={`flex flex-col items-center justify-center h-full space-y-3 border-2  rounded-xl p-5 ${
                        isDragActive
                            ? "border-red-500 border-dashed"
                            : "border-green-500 border-dashed"
                    }`}
                >
                    {isDragReject ? (
                        <div className="flex flex-col justify-center items-center">
                            <Image
                                src="/tongue.svg"
                                width={150}
                                height={150}
                                alt="tongue_image"
                                className="my-3"
                            />
                            <p>Sorry, This app only supports images and mp3</p>
                        </div>
                    ) : (
                        <>
                            <Folder size={90} />
                            <p>Drag & Drop Files Here</p>
                            <p className="mt-2 text-base text-gray-300">
                                Only jpeg , png files supported
                            </p>
                            <p>{file?.name}</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DropZoneComponent;
