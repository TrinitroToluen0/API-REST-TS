import express from "express";
import cors from "cors";

import logger from "./middlewares/logger";
import badJsonHandler from "./middlewares/badJsonHandler";
import sendResponse from "./middlewares/sendResponse";
import notFoundRoute from "./middlewares/notFound";

import portfolioRoutes from "./routes/portfolio";
import chatRoutes from "./routes/chatApp";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";

const app = express();
app.disable("x-powered-by");
app.use(logger);
app.use(sendResponse);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(badJsonHandler);

// Rutas
app.use(userRoutes);
app.use("/portfolio", portfolioRoutes);
app.use("/chat", chatRoutes);
app.use("/auth", authRoutes);

app.use(notFoundRoute);
export default app;
