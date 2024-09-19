import { CAPTCHA_SECRET_KEY, PORTFOLIO_CONTACT_EMAIL } from "../config";
import { sendEmail } from "../utils/email";
import { Request, Response } from "express";

class ContactController {
    public async handleContactForm(req: Request, res: Response) {
        const { fullName, email, message, token } = req.body;

        const recaptchaURL = "https://www.google.com/recaptcha/api/siteverify";

        const response = await fetch(recaptchaURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `secret=${CAPTCHA_SECRET_KEY}&response=${token}`,
        });

        const recaptchaData = await response.json();

        if (recaptchaData.success && recaptchaData.score > 0.5) {
            try {
                await sendEmail(email, PORTFOLIO_CONTACT_EMAIL!, "Contacto a través del portfolio", `Nombre: ${fullName}\nCorreo electrónico: ${email}\n\n${message}`);
                res.sendResponse(200, true);
            } catch (error) {
                res.sendResponse(500, false);
            }
        } else {
            res.sendResponse(403, false, "Captcha validation failed.");
        }
    }
}

export default new ContactController();
