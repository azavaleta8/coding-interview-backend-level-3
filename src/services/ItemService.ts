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

    /**
     * Retrieves an item by its ID.
     *
     * @param {string} id - The ID of the item to retrieve.
     * @returns {Promise<Item>} The item corresponding to the provided ID.
     * @throws {Error} If the item is not found.
     */
    async getItemById(id : string) {
        const item = await ItemModel.findById(id);
        if (!item) {
            throw new Error('Item not found');
        }
        return sanitizeResponse(item);
    },

    /**
     * Retrieves all items.
     *
     * @returns {Promise<Item>} The item corresponding to the provided ID.
     * @throws {Error} If the items are not found.
     */
    async getAllItems() {
        const items = await ItemModel.find();
        if (!items) {
            throw new Error('Item not found');
        }
        return items.map(item => sanitizeResponse(item));
    },

    /**
     * Deletes an item by its ID.
     *
     * @param {string} id - The ID of the item to be deleted.
     * @returns {Promise<{ message: string }>} A promise that resolves to an object containing a success message.
     * @throws {Error} If the item is not found.
     */
    async deleteItem(id: string) {
        const item = await ItemModel.findByIdAndDelete(id);
        if (!item) {
            throw new Error('Item not found');
        }
        return { message: 'Item deleted successfully' };
    },
}