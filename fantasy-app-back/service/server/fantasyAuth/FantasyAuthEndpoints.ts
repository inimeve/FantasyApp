import { NextFunction, Request, Response } from 'express';
import { noCache } from '../middlewares/NoCacheMiddleware';
import { Endpoint } from '../types/Endpoint';
import { ServiceInjector } from '../utils/ServiceInjector'
import { FantasyAuthService } from './FantasyAuthService'

export class FantasyAuthEndpoints {

    private resourcePath: string = '/auth';

    public endpoints: Endpoint[];

    constructor(private fantasyAuthService: FantasyAuthService) {
        this.endpoints = this.configEndpoints();

        const injector: ServiceInjector = ServiceInjector.getInstance();
        this.fantasyAuthService = injector.getService(FantasyAuthService);
    }

    public configEndpoints (): Endpoint[] {
        return [
            { path: `${this.resourcePath}/refresh`, method: this.refreshAccessToken, middleware: [noCache]},
            { path: `${this.resourcePath}/get`, method: this.getRefreshToken, middleware: [noCache]}
        ]
    };

    public refreshAccessToken = (req: Request, res: Response, next: NextFunction) => {
        try {
            const refreshToken: string = req.query.rf;

            this.fantasyAuthService.refreshAccessToken(refreshToken)
                .then((data: any) => res.json(data));
        } catch (err) {
            next(err);
        }
    };

    public getRefreshToken = (req: Request, res: Response, next: NextFunction) => {
        try {
            res.send(this.fantasyAuthService.getRefreshToken());
        } catch (err) {
            next(err);
        }
    };

}
