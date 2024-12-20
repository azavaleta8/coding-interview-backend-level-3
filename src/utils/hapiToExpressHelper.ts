import { Application } from 'express';
import request, { Response } from 'supertest';

/**
 * Helper function to convert Hapi.js requests to Express.js requests.
 *
 * @param app - The Express application instance.
 * @param method - The HTTP method (e.g., 'get', 'post', 'put', 'delete').
 * @param url - The URL endpoint to send the request to.
 * @param payload - Optional payload to send with the request (for 'post', 'put', and 'delete' methods).
 * @returns A Promise that resolves to the response of the request.
 * @throws Will throw an error if the HTTP method is unsupported.
 */
export const hapiToExpressHelper = async (
    app: Application,
    method: string,
    url: string,
    payload?: object
): Promise<Response> => {

    switch (method) {
        case 'get':
            return request(app).get(url);
        case 'post':
            return request(app).post(url).send(payload);
        case 'put':
            return request(app).put(url).send(payload);
        case 'delete':
            return request(app).delete(url).send(payload);
        default:
            throw new Error(`Unsupported method: ${method}`);
    }
};