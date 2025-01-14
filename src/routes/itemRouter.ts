import express from 'express';
import { createItemController, deleteItemController, getItemByIdController,getItemsController, updateItemController} from '../controllers/itemController';
import { validateItemId, validatePOST } from '../validators/itemValidation';

const router = express.Router();

/**
 * @swagger
 * /items:
 *   post:
 *     summary: Create a Item
 *     tags: [Items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *                 example: Item 1
 *               price:
 *                 type: number
 *                 example: 12
 *     responses:
 *       201:
 *         description: Item created successfully
 *       400:
 *         description: Bad request
 *       422:
 *         description: Unprocessable Entity
 */
router.post('/items', validatePOST, createItemController);

/**
 * @swagger
 * /items/{id}:
 *   get:
 *     summary: Get item by ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item details
 *       404:
 *         description: Item not found
 *       422:
 *         description: Unprocessable Entity
 */
router.get('/items/:id', validateItemId, getItemByIdController);

/**
 * @swagger
 * /items:
 *   get:
 *     summary: Get all items
 *     tags: [Items]
 *     responses:
 *       200:
 *         description: Item details
 *       404:
 *         description: Item not found
 */
router.get('/items', getItemsController);

/**
 * @swagger
 * /items/{id}:
 *   put:
 *     summary: Update a item
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
*             type: object
*             required:
*               - name
*               - price
*             properties:
*               name:
*                 type: string
*                 example: Item 1
*               price:
*                 type: number
*                 example: 12
 *     responses:
 *       200:
 *         description: Item updated successfully
 *       404:
 *         description: Question not found
 *       422:
 *         description: Validation error
 */
router.put('/items/:id', validateItemId, validatePOST, updateItemController);

/**
 * @swagger
 * /items/{id}:
 *   delete:
 *     summary: Delete item by ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Item deleted succefully
 *       404:
 *         description: Item not found
 *       422:
 *         description: Unprocessable Entity
 */
router.delete('/items/:id', validateItemId, deleteItemController);

export default router;