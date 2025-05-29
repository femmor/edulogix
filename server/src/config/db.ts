import mongoose from "mongoose";
import logger from "../utils/logger.ts";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        logger.info("MongoDB connected successfully!");
    } catch (error) {
        logger.error(`Failed to process request: ${error}`);
        // Only exit if not in test environment
        if (process.env.NODE_ENV !== 'test') {
            process.exit(1);
        }
    }
};

export default connectDB;