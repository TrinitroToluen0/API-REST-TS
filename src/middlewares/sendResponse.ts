import { Request, Response, NextFunction } from "express";

/**
 * Interface for the structure of the response object.
 */
interface ResponseInterface {
    statusCode: number;
    success: boolean;
    message?: string;
    data?: object;
}

/**
 * Extending the 'Response' interface from Express to include the 'sendResponse' method.
 */
declare module "express-serve-static-core" {
    interface Response {
        sendResponse: (statusCode: number, success: boolean, message?: string, data?: object) => Response;
    }
}

/**
 * Function to send a response to the client.
 * @param this - Represents the Response object from Express.
 * @param statusCode - The HTTP status code of the response.
 * @param success - The success status of the operation.
 * @param message - Optional message to be included in the response.
 * @param data - Optional data to be included in the response.
 * @returns The Response object from Express.
 */
function sendResponse(this: Response, statusCode: number, success: boolean, message: string = "", data: object = {}): Response {
    const response: ResponseInterface = {
        statusCode: statusCode,
        success: success,
    };

    if (Object.keys(data).length > 0) {
        response.data = data;
    }

    if (message) {
        response.message = message;
    } else {
        if (response.statusCode === 500) {
            response.message = "There was an error. Please try again later.";
        }
    }

    this.status(statusCode).json(response);
    return this;
}

/**
 * Middleware to add the 'sendResponse' method to the 'res' object from Express.
 */
export default (_req: Request, res: Response, next: NextFunction) => {
    res.sendResponse = sendResponse.bind(res);
    next();
};
