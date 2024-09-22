import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";
import { DEV_MODE } from "../config";

export default (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();
    res.on("finish", () => {
        const duration = Date.now() - start;
        let message = `${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms `;
        if (!DEV_MODE) {
            message += req.socket.remoteAddress || req.headers["x-forwarded-for"];
        }
        logger.http(message);
    });
    next();
};
