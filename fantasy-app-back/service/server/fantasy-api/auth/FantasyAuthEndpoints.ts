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
            const refreshToken: any = req.body.refresh_token;

            this.fantasyAuthService.getTokens(refreshToken)
                .then((tokenData: any) => {
                    res.json(tokenData);
                })
                .catch((err: any) => {
                    res.status(400).send(err);
                });

        } catch (err) {
            next(err);
        }
    }

}
