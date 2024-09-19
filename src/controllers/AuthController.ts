import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/UserModel";
import bcrypt from "bcrypt";
import { JWT_SECRET } from "../config";
import logger from "../utils/logger";

class AuthController {
    public async login(req: Request, res: Response): Promise<Response> {
        if (!JWT_SECRET) {
            throw new Error("JWT secret must be defined for auth controller to work.");
        }

        if (req.cookies && req.cookies["auth-token"]) {
            return res.sendResponse(400, false, "You are already logged in.");
        }

        const { email, password } = req.body;

        try {
            const user = await User.findOne({ $or: [{ email }, { username: email }] });
            if (!user) {
                return res.sendResponse(401, false, "Invalid username or password");
            }

            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.sendResponse(401, false, "Invalid username or password");
            }

            const token = jwt.sign({ _id: user._id }, JWT_SECRET);
            return res.cookie("auth-token", token, { httpOnly: true, secure: true }).json({ success: true, token });
        } catch (error: any) {
            logger.error(error.message);
            return res.sendResponse(500, false);
        }
    }

    public logout(_req: Request, res: Response): Response {
        res.clearCookie("auth-token");
        return res.sendResponse(200, true, "You have been logged out.");
    }
}

export default new AuthController();
