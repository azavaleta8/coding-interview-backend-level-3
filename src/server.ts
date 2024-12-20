import dotenv from 'dotenv';
import mongoose from 'mongoose';
import createApp from './config/app';
import Hapi, { Server } from '@hapi/hapi';
import { hapiToExpressHelper } from './utils/hapiToExpressHelper';
import { Response } from 'supertest';

// ENV
dotenv.config();

// Mongoose config
mongoose.set('strictQuery', false);

// ENV variables configuration
const NODE_ENV: string = process.env.NODE_ENV || 'dev';
const PORT: number = parseInt(process.env.PORT || '3000', 10);
const HOST: string = process.env.RENDER_EXTERNAL_URL || 'localhost';
const MONGODB_URI: string | undefined = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('Error: MONGODB_URI is not defined.');
    process.exit(1);
}

// Connect to MongoDB
const connectToDatabase = async (test = false): Promise<void> => {
    try {
        await mongoose.connect(MONGODB_URI);
        if(!test){
            console.log('MongoDB initialized successfully:', mongoose.connection.host);
        }
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

// Start API server
export const startServer = async (): Promise<void> => {
    try {
        await connectToDatabase();

        const app = await createApp();
        app.listen(PORT, HOST, () => {
            console.log(`Server running on http://${HOST}:${PORT} in ${NODE_ENV} mode`);
            console.log(`Swagger docs are available at  http://${HOST}:${PORT}/api-docs`);
        });
    } catch (error) {
        console.error('Error starting the server:', error);
        process.exit(1);
    }
};

/**
 * Initializes the Hapi server and sets up a proxy middleware to forward requests to an Express server.
 * 
 * @returns {Promise<Hapi.Server>} A promise that resolves to the initialized Hapi server.

 * This function creates an Express application and starts an Express server on the specified HOST and PORT.
 * It then creates a Hapi server on a different port (PORT + 1) and sets up a route to proxy all requests
 * to the Express server using the `hapiToExpressHelper` function.
 * 
 */
export const initializeServer = async (): Promise<Hapi.Server> => {
    const expressApp = await createApp();
    expressApp.listen(PORT, HOST, () => {
        console.log(`Express server running on http://${HOST}:${PORT}`);
    });

    const server : Server = Hapi.server({
        port: PORT,
        host: HOST,
    });

    // Proxy middleware
    server.route({
        method: '*',
        path: '/{any*}',
        handler: async (request, h) => {
            try {
                // Usar Supertest para realizar la solicitud al API Express
                const method = request.method.toLowerCase();
                const url = request.path.toString();
                const payload = request.payload as object;

                const response: Response = await hapiToExpressHelper(expressApp, method, url, payload);

                return h.response(response.body).code(response.status);
            } catch (error) {

                console.error('Error handling request:', error);
                return h.response({ error: 'Internal Server Error' }).code(500);
          
            }
        },
    });

    return server;
};