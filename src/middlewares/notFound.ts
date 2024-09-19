import { Request, Response } from "express";

export default (_req: Request, res: Response) => {
    res.sendResponse(404, false, "Route not found.");
};
