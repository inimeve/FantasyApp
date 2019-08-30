import * as express from 'express';
import { Express } from 'express';
import { Server } from 'http';
import * as compress from 'compression';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import { Endpoint } from './types/Endpoint';
import { noCache } from './middlewares/NoCacheMiddleware';
import { Request } from 'express';
import { Response } from 'express';
import { NextFunction } from 'express';
import { RequestServices } from './Application'
import { addServicesToRequest } from './middlewares/ServiceDependenciesMiddleware'

/**
 * Abstraction around the raw Express.js server and Nodes' HTTP server.
 * Defines HTTP request mappings, basic as well as request-mapping-specific
 * middleware chains for application logic, config and everything else.
 */
export class ExpressServer {
    private server?: Express;
    private httpServer?: Server;

    private pathPrefix: string = '/api';

    private healthPath: string = '/health';

    constructor(private endpoints: Endpoint[], private requestServices: RequestServices) {}

    public async setup(port: number) {
        const server = express();
        this.setupStandardMiddlewares(server);
        this.configureHealthEndpoint(server);
        this.setupServiceDependencies(server);
        this.configureEndpoints(server);

        this.httpServer = this.listen(server, port);
        console.info(`Listening on ${port}`);
        this.server = server;
        return this.server;
    }

    public listen(server: Express, port: number) {
        return server.listen(port);
    }

    public kill() {
        if (this.httpServer) this.httpServer.close();
    }

    private setupStandardMiddlewares(server: Express) {
        server.use(bodyParser.json());
        server.use(cookieParser());
        server.use(compress());
    }

    private setupServiceDependencies(server: Express) {
        const servicesMiddleware = addServicesToRequest(this.requestServices)
        server.use(servicesMiddleware)
    }

    private configureEndpoints (server: Express) {
        console.log('Available endpoints:');
        for(let endpoint of this.endpoints) {
            console.log(`${this.pathPrefix}${endpoint.path}`);
            server.get(`${this.pathPrefix}${endpoint.path}`, endpoint.middleware, endpoint.method);
        }
    }

    private configureHealthEndpoint (server: Express) {
        server.get(`${this.pathPrefix}${this.healthPath}`, noCache, (req: Request, res: Response, next: NextFunction) => {
            try {
                res.send(new Date());
            } catch (err) {
                next(err);
            }
        })
    }

}
