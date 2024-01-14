import { sizeInMb } from "@/lib/sizeInMb";
import { IFile } from "@/lib/type";
import React, { FunctionComponent } from "react";
import Image from "next/image";

const FileDetails: FunctionComponent<{
    file: IFile;
}> = ({ file }) => {
    return (
        <div className="flex justify-center items-center border-2 border-dashed p-3 rounded-md space-x-4">
            <Image className="w-14" src="/tongue.svg" alt="file_image" />
            <span>{file.name}</span>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-amber-600 bg-amber-200  last:mr-0 mr-1">
                {sizeInMb(file.sizeInBytes)}
            </span>
        </div>
    );
};

export default FileDetails;
