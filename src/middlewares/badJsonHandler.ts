import { Request, Response, NextFunction } from "express";

interface Error {
    status?: number;
}

export default (err: Error & SyntaxError, _req: Request, res: Response, next: NextFunction) => {
    if (err instanceof SyntaxError && "body" in err && err.status === 400) {
        return res.sendResponse(400, false, "Invalid JSON format.");
    }
    return next();
};
