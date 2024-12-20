import express, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const healthCheckRouter = express.Router();

/**
 * @swagger
 * /ping:
 *   get:
 *     summary: Perform a health check on the API
 *     tags:
 *       - Health Check
 *     responses:
 *       200:
 *         description: API is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "ok: true"
 */
healthCheckRouter.get('/ping', (_req: Request, res: Response) => {
    // Creating success response object
    const response = { ok: true };

    res.status(StatusCodes.OK).send(response); // Sending success response
});

export default healthCheckRouter;
