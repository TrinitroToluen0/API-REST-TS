import { Router } from "express";
import UserController from "../controllers/UserController";

const router = Router();

router.get("/users/:id", UserController.getUser); // Get info about a specific user.
router.post("/users", UserController.createUser); // Create a user.
router.put("/users/:id", UserController.editUser); // Edit a user.
router.delete("/users/:id", UserController.deleteUser); // Delete a user.

export default router;
