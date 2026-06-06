import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGO_URL || process.env.MONGO_URI;

        if (!mongoUri) {
            console.error("MongoDB connection error: MONGO_URL/MONGO_URI is not set in environment variables.");
            return;
        }

        await mongoose.connect(mongoUri, {
            serverSelectionTimeoutMS: 10000,
        });

        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error.message || error);
    }
};

export default connectDB;