import { RequestHandler } from 'express';

export interface Endpoint {
    path: string,
    method: RequestHandler,
    middleware: RequestHandler[]
}
