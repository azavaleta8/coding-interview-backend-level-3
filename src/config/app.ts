import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerOptions from './swagger';
import { notFoundMiddleware, errorHandlerMiddleware } from '../middlewares/errorHandle';
import { apiLimiter } from './rateLimit';

import healthCheckRouter from '../routes/healthCheckRouter';

/**
 * Creates and configures an Express application.
 *
 * This function sets up middleware for JSON parsing, logging, CORS, and rate limiting.
 * It also configures Swagger for API documentation and sets up the health check route.
 * Additionally, it defines a root route that returns a JSON message indicating the API is running.
 * Error handling middleware for 404 and general errors are also included.
 *
 * @returns {Application} The configured Express application.
 */
const createApp = (): Application => {
    const app: Application = express();

    // Middleware
    app.use(express.json());
    app.use(morgan('dev'));
    app.use(cors());
    app.use(apiLimiter);

    // Swagger Config
    const swaggerDocs = swaggerJsDoc(swaggerOptions);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

    // Routes
    app.use('', healthCheckRouter);

    // Root route
    app.get('/', (req: Request, res: Response) => {
        res.json({ message: 'El Dorado Code Interview API is running' });
    });

    // Error handling middlewares
    app.use(notFoundMiddleware);
    app.use(errorHandlerMiddleware);

    return app;
};

export default createApp;