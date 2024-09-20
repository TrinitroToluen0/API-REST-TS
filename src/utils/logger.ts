import c from "./colors";
import { DEV_MODE } from "../config";
import fs from "fs";
import path from "path";

class Logger {
    private timestamp: string;

    constructor() {
        this.timestamp = new Date().toLocaleString("es-CO", { hour12: false });
        this.updateTimestamp();
    }

    private updateTimestamp(): void {
        this.timestamp = new Date().toLocaleString("es-CO", { hour12: false });
    }

    private writeToLogFile(message: string, level: string): void {
        const formattedMessage = `[${level}] ${this.timestamp} ${message}\n`;
        const logPath = DEV_MODE === true ? "./logs/dev.log" : "./logs/prod.log";
        const logDir = path.dirname(logPath);

        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir, { recursive: true });
        }

        fs.appendFile(logPath, formattedMessage, (err) => {
            if (err) {
                console.error(`Failed to write to log file: ${err}`);
            }
        });
    }

    private log(level: string, color: string, message: string): void {
        this.updateTimestamp();
        console.log(`[${color}${level}${c.reset}] ${c.bright}${c.gray}${this.timestamp}${c.reset} ${message}`);
        this.writeToLogFile(message, level);
    }

    public info(message: string): void {
        this.log("INFO", c.cyan, message);
    }

    public error(message: string): void {
        this.log("ERROR", c.red, message);
    }

    public warn(message: string): void {
        this.log("WARN", c.yellow, message);
    }

    public debug(message: string): void {
        this.log("DEBUG", c.magenta, message);
    }

    public http(message: string): void {
        this.log("HTTP", c.green, message);
    }
}

const logger = new Logger();

export default logger;
