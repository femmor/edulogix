import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import logger from "./utils/logger.js";

dotenv.config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5006;

app.listen(PORT, () => logger.info("Server is running on port " + PORT));