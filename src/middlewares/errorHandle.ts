import { Request, Response} from 'express';
import { StatusCodes } from 'http-status-codes';

// Middleware to handle routes not found (404)
export const notFoundMiddleware = (req: Request, res: Response): void => {
    res.status(StatusCodes.NOT_FOUND).json({
        message: 'Resource not found',
    });
};

// Middleware to handle general errors
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
