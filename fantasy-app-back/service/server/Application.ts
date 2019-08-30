import { ExpressServer } from './ExpressServer'
import { FantasyDataEndpoints } from './fantasyData/FantasyDataEndpoints';
import { FantasyAuthEndpoints } from './fantasyAuth/FantasyAuthEndpoints'
import { Endpoint } from './types/Endpoint'
import { FantasyDataRepository } from './fantasyData/FantasyDataRepository'
import { FantasyDataService } from './fantasyData/FantasyDataService'
import { FantasyAuthService } from './fantasyAuth/FantasyAuthService'
import { FantasyAuthSupplier } from './fantasyAuth/FantasyAuthSupplier'


export interface RequestServices {
    fantasyDataService: FantasyDataService,
    fantasyAuthService: FantasyAuthService
}

/**
 * Wrapper around the Node process, ExpressServer abstraction and complex dependencies such as services that ExpressServer needs.
 * When not using Dependency Injection, can be used as place for wiring together services which are dependencies of ExpressServer.
 */
export class Application {
    public static async createApplication() {
        const fantasyDataService: FantasyDataService = new FantasyDataService(new FantasyDataRepository());
        const fantasyAuthService: FantasyAuthService = new FantasyAuthService(new FantasyAuthSupplier());

        const requestServices: RequestServices = {fantasyDataService, fantasyAuthService};
        const endpoints: Endpoint[] = [...new FantasyDataEndpoints().endpoints, ...new FantasyAuthEndpoints().endpoints];

        const expressServer = new ExpressServer(endpoints, requestServices);

        const PORT: any = process.env.PORT ||3000;
        await expressServer.setup(PORT);
        Application.handleExit(expressServer);

        return expressServer;
    }

    private static handleExit(express: ExpressServer) {
        process.on('uncaughtException', (err: Error) => {
            console.error('Uncaught exception', err)
            Application.shutdownProperly(1, express)
        })
        process.on('unhandledRejection', (reason: {} | null | undefined) => {
            console.error('Unhandled Rejection at promise', reason)
            Application.shutdownProperly(2, express)
        })
        process.on('SIGINT', () => {
            console.info('Caught SIGINT')
            Application.shutdownProperly(128 + 2, express)
        })
        process.on('SIGTERM', () => {
            console.info('Caught SIGTERM')
            Application.shutdownProperly(128 + 2, express)
        })
        process.on('exit', () => {
            console.info('Exiting')
        })
    }

    private static shutdownProperly(exitCode: number, express: ExpressServer) {
        Promise.resolve()
            .then(() => express.kill())
            .then(() => {
                console.info('Shutdown complete')
                process.exit(exitCode)
            })
            .catch(err => {
                console.error('Error during shutdown', err)
                process.exit(1)
            })
    }
}
