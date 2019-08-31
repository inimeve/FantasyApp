import { RequestHandler } from 'express';
import { RequestHandlerParams } from 'express-serve-static-core'

export interface Endpoint {
    path: string,
    method: RequestHandler,
    middleware: RequestHandlerParams
}
