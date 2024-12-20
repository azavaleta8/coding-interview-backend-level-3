import { Application } from 'express';
import request, { Response } from 'supertest';

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