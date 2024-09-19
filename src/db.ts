import { MONGODB_URI } from "./config";
import mongoose from "mongoose";
import logger from "./utils/logger";

export async function connectDB() {
    if (!MONGODB_URI) {
        throw new Error("MongoDB uri is required to connect to Mongo.");
    }
    try {
        const db = await mongoose.connect(MONGODB_URI);
        logger.info(`Connected to database: ${db.connection.db.databaseName}`);
    } catch (error: any) {
        logger.error(error);
    }
}
