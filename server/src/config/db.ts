import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        console.log(`MongoDB connected successfully!`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        // Only exit if not in test environment
        if (process.env.NODE_ENV !== 'test') {
            process.exit(1);
        }
    }
};

export default connectDB;