import * as express from 'express';
import { Express } from 'express';
import { Server } from 'http';
import * as compress from 'compression';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import { noCache } from './middlewares/NoCacheMiddleware';
import { Request } from 'express';
import { Response } from 'express';
import { NextFunction } from 'express';

/**
 * Abstraction around the raw Express.js server and Nodes' HTTP server.
 * Defines HTTP request mappings, basic as well as request-mapping-specific
 * middleware chains for application logic, config and everything else.
 */
export class ExpressServer {
    private server?: Express;
    private httpServer?: Server;

    private resourcesEndpoints: any = {};

    private pathPrefix: string = '/api';

    private healthPath: string = '/health';

    constructor() {}

    public async setup(port: number) {
        const server = express();
        this.configureEndpoints(server);
        this.setupStandardMiddlewares(server);
        this.configureHealthEndpoint(server);

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

    public registerResourceEndpoints (resourceEndpoints: any) {
        if (this.resourcesEndpoints[resourceEndpoints.name]? true: false) {
            return;
        }
        const construction = new resourceEndpoints.prototype.constructor();
        this.resourcesEndpoints[resourceEndpoints.name] = construction;
    }

    private configureEndpoints (server: Express) {
        console.log('Available endpoints:');

        for(let resourceEndpointsName in this.resourcesEndpoints) {
            for(let endpoint of this.resourcesEndpoints[resourceEndpointsName].endpoints) {
                console.log(`${this.pathPrefix}${endpoint.path}`);
                server.get(`${this.pathPrefix}${endpoint.path}`, endpoint.middleware, endpoint.method);
            }
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
