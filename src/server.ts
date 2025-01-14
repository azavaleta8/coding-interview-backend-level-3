import dotenv from 'dotenv';
import mongoose from 'mongoose';
import createApp from './config/app';
import Hapi, { Server } from '@hapi/hapi';
import { hapiToExpressHelper } from './utils/hapiToExpressHelper';
import { Response } from 'supertest';
import { Server as ExpressServer} from 'http';

 
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

/**
 * Connects to the MongoDB database using the provided URI.
 * 
 * @param {boolean} [test=false] - A flag indicating whether the connection is for testing purposes. 
 *                                 If true, no success message will be logged.
 * @returns {Promise<void>} - A promise that resolves when the connection is established.
 * @throws Will log an error message and exit the process if the connection fails.
 */
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

/**
 * Starts the server by connecting to the database, creating the application,
 * and listening on the specified host and port.
 *
 * @async
 * @function
 * @returns {Promise<void>} A promise that resolves when the server has started successfully.
 * @throws Will throw an error if there is an issue starting the server.
 */
export const startServer = async (): Promise<void> => {
    try {
        await connectToDatabase();

        const app = await createApp();
        app.listen(PORT, () => {
            if (NODE_ENV === 'production') {
                console.log(`Server running on ${HOST} in ${NODE_ENV} mode`);
                console.log(`Swagger docs are available at ${HOST}/api-docs`);
            } else {
                console.log(`Server running on http://${HOST}:${PORT} in ${NODE_ENV} mode`);
                console.log(`Swagger docs are available at http://${HOST}:${PORT}/api-docs`);
            }
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

 * This function creates an Express application and starts an Express server.
 * It then creates a Hapi server and sets up a route to proxy all requests
 * to the Express server using the `hapiToExpressHelper` function.
 * 
 */

// References to the servers
let expressServer: ExpressServer | null = null;
let hapiServer: Server | null = null;

// Initialize server for test
export const initializeServer = async (): Promise<Hapi.Server> => {
  // Close existing servers if they are running
  if (expressServer) {
    expressServer.close(() => {
      console.log('Existing Express server closed.');
    });
  }
  if (hapiServer) {
    await hapiServer.stop();
    console.log('Existing Hapi server stopped.');
  }

  // Create and start the Express application
  const expressApp = createApp();
  expressServer = expressApp.listen(PORT, HOST, () => {
    console.log(`Express server running on http://${HOST}:${PORT}`);
  });

  // Connect to the MongoDB database
  await connectToDatabase(true);

  // Create a new Hapi server
  hapiServer = Hapi.server({
    port: PORT + 1, // Use a different port for Hapi to avoid conflict
    host: HOST,
  });

  // Proxy middleware to forward requests from Hapi to Express
  hapiServer.route({
    method: '*', // Match all HTTP methods
    path: '/{any*}', // Match all routes
    handler: async (request, h) => {
      try {
        // Extract method, URL, and payload from the Hapi request
        const method = request.method.toLowerCase();
        const url = request.path.toString();
        const payload = request.payload as object;

        // Use Supertest to make the request to the Express API
        const response: Response = await hapiToExpressHelper(expressApp, method, url, payload);

        // Return the response from Express to the Hapi client
        return h.response(response.body).code(response.status);
      } catch (error) {
        // Log the error and return a 500 Internal Server Error response
        console.error('Error handling request:', error);
        return h.response({ error: 'Internal Server Error' }).code(500);
      }
    },
  });

  // Return the initialized Hapi server
  return hapiServer;
};