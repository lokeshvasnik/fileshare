import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
    } catch (error) {
        console.log("Connection Error In DB", error);
    }

    const connection = mongoose.connection;

    if (connection.readyState >= 1) {
        console.log("Connected to DB");
    } else {
        connection.on("error", () => console.log("Connection Failed"));
    }
};

export default connectDB;
