import { Request, Response, NextFunction } from 'express';
import { body, param, validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';

export const validatePOST = [
    body('name')
        .notEmpty().withMessage('Item name is required')
        .isString().withMessage('Item name must be a string'),
    body('price')
        .isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: errors.array() });
            return;
        }
        next();
    },
];

export const validateItemId = [
	param('id')
    .notEmpty()
    .isString()
    .withMessage('Invalid Item ID'),
	async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: errors.array() });
            return;
        }
        next();
    },
];