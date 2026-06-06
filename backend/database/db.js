import mongoose from "mongoose";

const globalCache = globalThis;

const connectDB = async () => {
    try {
        if (mongoose.connection.readyState === 1) {
            return true;
        }

        if (!globalCache.__mongooseConnectPromise) {
            const mongoUri = process.env.MONGO_URL || process.env.MONGO_URI;

            if (!mongoUri) {
                throw new Error("MONGO_URL/MONGO_URI is not set in environment variables.");
            }

            globalCache.__mongooseConnectPromise = mongoose.connect(mongoUri, {
                serverSelectionTimeoutMS: 10000,
            }).then(() => {
                console.log("MongoDB connected successfully");
                return true;
            }).catch((error) => {
                globalCache.__mongooseConnectPromise = null;
                throw error;
            });
        }

        await globalCache.__mongooseConnectPromise;
        return true;
    } catch (error) {
        console.error("MongoDB connection error:", error.message || error);
        throw error;
    }
};

export default connectDB;