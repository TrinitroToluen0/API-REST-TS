import logger from "./logger";

process.on("unhandledRejection", (reason: any) => {
    if (reason.stack) {
        logger.error(reason.stack);
    } else {
        logger.error("Unhandled rejection");
    }
});
process.on("uncaughtException", (error: Error) => {
    if (error.stack) {
        logger.error(error.stack);
    } else {
        logger.error("Uncaught exception");
    }
});
process.on("uncaughtExceptionMonitor", (error: Error) => {
    if (error.stack) {
        logger.error(error.stack);
    } else {
        logger.error("Uncaught exception monitor");
    }
});

logger.info("Error handler working");
