import { SERVER_PORT } from "./config";
import logger from "./utils/logger";
import app from "./app";
import { connectDB } from "./db";
import "./utils/errorHandler";

app.listen(SERVER_PORT, () => {
    logger.info(`Server is ready on http://localhost:${SERVER_PORT}`);
});

connectDB();
