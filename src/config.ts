import dotenv from "dotenv";
dotenv.config();

export const DEV_MODE: boolean = false;
export const SERVER_PORT = process.env.SERVER_PORT || 80;
export const CAPTCHA_SECRET_KEY = process.env.CAPTCHA_SECRET_KEY;
export const SMTP_HOST = process.env.SMTP_HOST;
export const SMTP_USERNAME = process.env.SMTP_USERNAME;
export const SMTP_PASSWORD = process.env.SMTP_PASSWORD;
export const SMTP_AUTH = process.env.SMTP_AUTH;
export const SMTP_PORT = process.env.SMTP_PORT;
export const SMTP_SECURE = process.env.SMTP_SECURE;
export const PORTFOLIO_CONTACT_EMAIL = process.env.PORTFOLIO_CONTACT_EMAIL;
export const MONGODB_URI = process.env.MONGODB_URI;
export const JWT_SECRET = process.env.JWT_SECRET;
