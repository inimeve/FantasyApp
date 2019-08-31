import { NextFunction, Request, Response } from 'express';
import { noCache } from '../middlewares/NoCacheMiddleware';
import { Endpoint } from '../types/Endpoint'
import { FantasyDataService } from './FantasyDataService'
import { ServiceInjector } from '../utils/ServiceInjector'
import { FantasyAuthService } from '../fantasyAuth/FantasyAuthService'

export class FantasyDataEndpoints {

    private resourcePath: string = '/fantasyData';

    public endpoints: Endpoint[];

    constructor(private fantasyDataService: FantasyDataService, private fantasyAuthService: FantasyAuthService) {
        this.endpoints = this.configEndpoints();

        const injector: ServiceInjector = ServiceInjector.getInstance();
        this.fantasyDataService = injector.getService(FantasyDataService);
        this.fantasyAuthService= injector.getService(FantasyAuthService);
    }

    public configEndpoints (): Endpoint[] {
        return [
            { path: `${this.resourcePath}/player/:playerId`, method: this.getPlayer, middleware: [noCache]},
            { path: `${this.resourcePath}/ranking/:leagueId`, method: this.getRankingData, middleware: [noCache]}
        ]
    };

    public getPlayer = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const playerId: number = req.params.playerId;

            this.fantasyDataService.getPlayer(playerId)
                .then((playerData: any) => {
                    if (playerData) {
                        res.json(playerData);
                    } else {
                        res.json({});
                    }
                })
                .catch((err: any) => {
                    next(err);
                })

        } catch (err) {
            next(err);
        }
    };

    public getRankingData = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const leagueId: string = req.params.leagueId;
            const accessToken: string = this.fantasyAuthService.getAccessToken();

            if (accessToken) {
                this.fantasyDataService.getRankingData(leagueId, accessToken)
                    .then((data: any) => res.json(data));
            } else {
                res.json({error: 'No access token setted'});
            }
        } catch (err) {
            next(err);
        }
    };

}
