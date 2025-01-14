import express from 'express';
import { createItemController, getItemByIdController,getItemsController} from '../controllers/itemController';
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


export default router;