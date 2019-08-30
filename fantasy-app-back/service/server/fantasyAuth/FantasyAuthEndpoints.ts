import { NextFunction, Request, Response } from 'express';
import { noCache } from '../middlewares/NoCacheMiddleware';
import { Endpoint } from '../types/Endpoint';

export class FantasyAuthEndpoints {

    private resourcePath: string = '/auth';

    public endpoints: Endpoint[];

    constructor() {
        this.endpoints = this.configEndpoints();
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

            req.services.fantasyAuthService.refreshAccessToken(refreshToken)
                .then((data: any) => res.json(data));
        } catch (err) {
            next(err);
        }
    };

    public getRefreshToken = (req: Request, res: Response, next: NextFunction) => {
        try {
            res.send(req.services.fantasyAuthService.getRefreshToken());
        } catch (err) {
            next(err);
        }
    };

}
