import { NextFunction, Request, Response } from 'express';
import { noCache } from '../../middlewares/NoCacheMiddleware';
import { Endpoint } from '../../types/Endpoint';
import { FantasyAuthService } from './fantasy-auth-service';

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
            { method: 'POST', path: `${this.resourcePath}/login`, serviceMethod: this.login, middleware: [noCache]},
            { method: 'POST', path: `${this.resourcePath}/checkLogin`, serviceMethod: this.checkTokenValidity, middleware: [noCache]}
        ]
    };

    public login = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const refreshToken: any = req.body.refresh_token;

            this.fantasyAuthService.login(refreshToken)
                .then((tokenData: any) => {
                    res.json(tokenData);
                })
                .catch((err: any) => {
                    res.status(400).send(err);
                });

        } catch (err) {
            next(err);
        }
    };

    public checkTokenValidity = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const accessToken: any = req.body.access_token;

            this.fantasyAuthService.checkTokenValidity(accessToken)
                .then((userData: any) => {
                    res.json(userData);
                })
                .catch((err: any) => {
                    res.status(400).send(err);
                });

        } catch (err) {
            next(err);
        }
    };

}
