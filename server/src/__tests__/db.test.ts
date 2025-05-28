import mongoose from "mongoose";
import connectDB from "../config/db";

jest.mock("mongoose", () => ({
    connect: jest.fn(),
}));

describe("connectDB", () => {
    const originalEnv = process.env;

    beforeEach(() => {
        jest.clearAllMocks();
        process.env = { ...originalEnv, MONGO_URI: "mongodb://localhost:27017/testdb" };
    });

    afterAll(() => {
        process.env = originalEnv;
    });

    it("should connect to MongoDB and log success message", async () => {
        const logSpy = jest.spyOn(console, "log").mockImplementation(() => { });
        (mongoose.connect as jest.Mock).mockResolvedValueOnce(undefined);

        await connectDB();

        expect(mongoose.connect).toHaveBeenCalledWith(process.env.MONGO_URI);
        expect(logSpy).toHaveBeenCalledWith("MongoDB connected successfully!");
        logSpy.mockRestore();
    });

    it("should log error and exit process on connection failure", async () => {
        const error = new Error("Connection failed");
        (mongoose.connect as jest.Mock).mockRejectedValueOnce(error);

        const errorSpy = jest.spyOn(console, "error").mockImplementation(() => { });
        const exitSpy = jest.spyOn(process, "exit").mockImplementation(((code?: number) => { throw new Error(`process.exit: ${code}`); }) as never);

        // Ensure NODE_ENV is not 'test' so process.exit(1) is called
        process.env.NODE_ENV = "development";

        await expect(connectDB()).rejects.toThrow("process.exit: 1");
        expect(errorSpy).toHaveBeenCalledWith("Error connecting to MongoDB:", error);

        errorSpy.mockRestore();
        exitSpy.mockRestore();
    });
});
