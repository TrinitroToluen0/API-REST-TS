import { Router } from "express";

const router = Router();

router.get("/channels"); // Get the channels where the user is a member of.
router.get("/channels/:id"); // Get info about a specific channel.
router.post("/channels"); // Create a channel.
router.put("/channels"); // Edit a channel.
router.delete("/channels"); // Delete a channel.

router.post("/channels/:id/messages"); // Create a message on a channel.
router.put("/messages/:id"); // Edit a message.
router.delete("messages/:id"); // Delete a message.

export default router;
