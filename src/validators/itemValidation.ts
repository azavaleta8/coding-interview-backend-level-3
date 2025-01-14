import { Request, Response, NextFunction } from 'express';
import { body, FieldValidationError, param, Result, ValidationError, validationResult } from 'express-validator';
import { UnknownFieldInstance } from 'express-validator/lib/base';
import { StatusCodes } from 'http-status-codes';

export const validatePOST = [
    body('name')
        .notEmpty().withMessage('Item name is required')
        .isString().withMessage('Item name must be a string'),
    body('price')
        .notEmpty().withMessage('Field "price" is required')
        .isFloat({ gt: 0 }).withMessage('Field "price" cannot be negative'),
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(StatusCodes.BAD_REQUEST).json({ errors: errorParser(errors.array()) });
            return;
        }
        next();
    },
];

const errorParser = (errors: ValidationError[]) => {
    const e : FieldValidationError  = errors[0] as FieldValidationError;
    return [{
        message: e.msg,
        field: e.path,
    }];
};

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