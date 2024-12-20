import { Request, Response} from 'express';
import { StatusCodes } from 'http-status-codes';


/**
 * Middleware to handle requests for resources that are not found.
 * 
 * This middleware sends a 404 Not Found response with a JSON message indicating
 * that the requested resource could not be found.
 * 
 * @param req - The incoming request object.
 * @param res - The outgoing response object.
 * 
 * @returns void
 */
export const notFoundMiddleware = (req: Request, res: Response): void => {
    res.status(StatusCodes.NOT_FOUND).json({
        message: 'Resource not found',
    });
};

/**
 * Middleware to handle errors in the application.
 *
 * @param err - The error object containing details of the error.
 * @param req - The request object.
 * @param res - The response object.
 *
 * Logs the error stack to the console and sends a JSON response with the error message and stack trace.
 * If the application is running in production mode, the stack trace is replaced with a pancake emoji.
 *
 * The response status code is set to the error's status code if available, otherwise it defaults to 500 (Internal Server Error).
 */
export const errorHandlerMiddleware = (
    err: any,
    req: Request,
    res: Response
): void => {
    console.error(err.stack);

    const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    const message = err.message || 'An error occurred on the server';

    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
    });
};
