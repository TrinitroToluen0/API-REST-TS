import nodemailer from "nodemailer";
import { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USERNAME, SMTP_PASSWORD } from "../config";
import logger from "../utils/logger";

const transporter = nodemailer.createTransport({
    // @ts-ignore
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_SECURE,
    auth: {
        user: SMTP_USERNAME,
        pass: SMTP_PASSWORD,
    },
});

export const sendEmail = async (from: string, to: string, subject: string, text: string) => {
    const mailOptions = {
        from,
        to,
        subject,
        text,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        return info;
    } catch (error) {
        logger.error(`There was an error sending an email: ${error}`);
        throw error;
    }
};
