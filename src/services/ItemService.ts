import { Item } from "../types/ItemType";
import { ItemModel } from "../models/Item";


function sanitizeResponse(item : Item) {
	const {
		_id, name, price,
	} = item;
	return {
		id: _id, name, price
	};
}


/**
 * Service for handling item-related operations.
 */
export const ItemService = {

    /**
     * Creates a new item.
     * 
     * @param itemPayload - The payload containing item details.
     * @returns The newly created item.
     */
    async createItem (itemPayload : any) {
        const newItem : Item = await ItemModel.create(itemPayload);
        return sanitizeResponse(newItem);
    },

}