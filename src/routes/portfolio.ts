import { Router } from "express";
import Contact from "../controllers/ContactController";

const router = Router();

router.post("/contact", Contact.handleContactForm);

export default router;
