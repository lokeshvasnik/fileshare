import mongoose, { Document } from "mongoose";

interface IFile extends Document {
    filename: string;
    secure_url: string;
    sizeInBytes: string;
    format: string;
    sender?: string;
    receriver?: string;
}

const Schema = mongoose.Schema;
const fileSchema = new Schema(
    {
        filename: {
            type: String,
            required: true,
        },
        secure_url: {
            type: String,
            required: true,
        },
        format: {
            type: String,
            required: true,
        },
        sizeInBytes: {
            type: String,
            required: true,
        },
        sender: {
            type: String,
        },
        receriver: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IFile>("File", fileSchema);
