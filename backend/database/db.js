import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGO_URL || process.env.MONGO_URI;

        if (!mongoUri) {
            throw new Error("MONGO_URL/MONGO_URI is not set in environment variables.");
        }

        await mongoose.connect(mongoUri, {
            serverSelectionTimeoutMS: 10000,
        });

        console.log("MongoDB connected successfully");
        return true;
    } catch (error) {
        console.error("MongoDB connection error:", error.message || error);
        throw error;
    }
};

export default connectDB;