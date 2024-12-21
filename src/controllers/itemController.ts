import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ItemService } from '../services/ItemService';

/**
 * Creates a new item.
 *
 * This function handles the creation of a new item by calling the ItemService's createItem method
 * with the request body. If the item is successfully created, it responds with a status code of 201 (Created)
 * and the created item in JSON format. If an error occurs during the creation process, it passes the error
 * to the next middleware function.
 *
 * @param req - The request object containing the item data in the body.
 * @param res - The response object used to send the status and JSON data.
 * @param next - The next middleware function in the stack to handle errors.
 * @returns A promise that resolves to void.
 */
export const createItemController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const item = await ItemService.createItem(req.body);
    res.status(StatusCodes.CREATED).json(item);
  } catch (error) {
    next(error);
  }
};