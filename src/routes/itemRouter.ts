import express from 'express';
import { createItemController } from '../controllers/itemController';
import { validatePOST } from '../validators/itemValidation';

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


export default router;