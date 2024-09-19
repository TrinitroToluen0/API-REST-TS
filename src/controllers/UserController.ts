import { Request, Response } from "express";
import User from "../models/UserModel";
import bcrypt from "bcrypt";
import userSchema from "../schemas/userSchema";
import mongoose from "mongoose";
import logger from "../utils/logger";

class UserController {
    public async createUser(req: Request, res: Response) {
        const { email, password, username, passwordConfirmation } = req.body;

        // Validar los datos del usuario
        const { error } = userSchema.validate({ email, password, passwordConfirmation, username }, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.sendResponse(400, false, "", { errors });
        }

        try {
            // Verificar si el correo electrónico ya existe en la base de datos
            const existingEmail = await User.findOne({ email });
            if (existingEmail) {
                return res.sendResponse(409, false, "The email already exists.");
            }

            // Verificar si el nombre de usuario ya existe en la base de datos
            const existingUsername = await User.findOne({ username });
            if (existingUsername) {
                return res.sendResponse(409, false, "The username already exists.");
            }

            // Hashea la contraseña
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Crea un nuevo documento de usuario con la contraseña hasheada
            const newUser = new User({
                email,
                password: hashedPassword,
                username,
            });

            // Guarda el usuario y envía una respuesta
            await newUser.save();
            return res.sendResponse(201, true);
        } catch (error: any) {
            logger.error(error.message);
            return res.sendResponse(500, false);
        }
    }

    public async getUser(req: Request, res: Response) {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.sendResponse(400, false, "Invalid user ID.");
        }

        try {
            const user = await User.findById(req.params.id).select("username image");
            if (!user) {
                return res.sendResponse(404, false, "User not found.");
            }
            return res.sendResponse(200, true, "", { user });
        } catch (err: any) {
            logger.error(err.message);
            return res.sendResponse(500, false);
        }
    }

    public async editUser(req: Request, res: Response) {
        const { id } = req.params;
        const { email, password, username, image } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.sendResponse(400, false, "Invalid user ID.");
        }

        try {
            const user = await User.findById(id);
            if (!user) {
                return res.sendResponse(404, false, "User not found.");
            }

            if (email) {
                user.email = email;
            }
            if (password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(password, salt);
            }
            if (username) {
                user.username = username;
            }
            if (image) {
                user.image = image;
            }

            await user.save();
            return res.sendResponse(200, true, "User updated successfully.");
        } catch (err: any) {
            logger.error(err.message);
            return res.sendResponse(500, false);
        }
    }

    public async deleteUser(req: Request, res: Response) {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.sendResponse(400, false, "Invalid user ID.");
        }

        try {
            const user = await User.findById(id);
            if (!user) {
                return res.sendResponse(404, false, "User not found.");
            }

            await User.deleteOne({ _id: id });
            return res.sendResponse(200, true, "User deleted successfully.");
        } catch (err: any) {
            logger.error(err.message);
            return res.sendResponse(500, false);
        }
    }
}

export default new UserController();
