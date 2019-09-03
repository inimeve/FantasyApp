import { NextFunction, Request, Response } from 'express';
import { noCache } from '../../middlewares/NoCacheMiddleware';
import { Endpoint } from '../../types/Endpoint';
import { FantasyAuthService } from './FantasyAuthService';

export class FantasyAuthEndpoints {

    private resourcePath: string = '/auth';

    public endpoints: Endpoint[];

    private fantasyAuthService: FantasyAuthService

    constructor() {
        this.endpoints = this.configEndpoints();

        this.fantasyAuthService = new FantasyAuthService();
    }

    public configEndpoints (): Endpoint[] {
        return [
            { method: 'POST', path: `${this.resourcePath}/getTokens`, serviceMethod: this.getTokens, middleware: [noCache]}
        ]
    };

    public getTokens = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const refreshToken: any = this.fantasyAuthService.getAuthHeader(req);

            this.fantasyAuthService.getTokens(refreshToken)
                .then(data => res.json(data))
                .catch(err => res.send(err));

        } catch (err) {
            next(err);
        }
    }

}
