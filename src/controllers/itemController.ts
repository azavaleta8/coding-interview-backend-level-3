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

/**
 * Controller to handle the request for getting an item by its ID.
 * 
 * @param req - Express request object containing the item ID in the parameters.
 * @param res - Express response object used to send the response.
 * @param next - Express next function to pass control to the next middleware.
 * @returns A promise that resolves to void.
 * 
 * @throws Will throw an error if the item is not found or if there is an unexpected error.
 */
export const getItemByIdController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		const item = await ItemService.getItemById(req.params.id);
		res.status(StatusCodes.OK).json(item);
	} catch (error) {
		if (error instanceof Error && error.message === 'Item not found') {
			res.status(StatusCodes.NOT_FOUND).json({ message: error.message });
		} else {
			next(error);
		}
	}
};

/**
 * Controller to handle the request for getting all items.
 * 
 * @param req - Express request object containing the item ID in the parameters.
 * @param res - Express response object used to send the response.
 * @param next - Express next function to pass control to the next middleware.
 * @returns A promise that resolves to void.
 * 
 * @throws Will throw an error if the items is not found or if there is an unexpected error.
 */
export const getItemsController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		const items = await ItemService.getAllItems();
		res.status(StatusCodes.OK).json(items);
	} catch (error) {
		if (error instanceof Error && error.message === 'Items not found') {
			res.status(StatusCodes.NOT_FOUND).json({ message: error.message });
		} else {
			next(error);
		}
	}
};