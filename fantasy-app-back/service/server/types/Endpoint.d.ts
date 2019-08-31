import { RequestHandler } from 'express';
import { RequestHandlerParams } from 'express-serve-static-core'

export interface Endpoint {
    method: string,
    path: string,
    serviceMethod: RequestHandler,
    middleware: RequestHandlerParams
}
