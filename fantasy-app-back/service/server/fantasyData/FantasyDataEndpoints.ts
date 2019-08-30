import { NextFunction, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import { noCache } from '../middlewares/NoCacheMiddleware';
import { Endpoint } from '../types/Endpoint';

export class FantasyDataEndpoints {

    private resourcePath: string = '/fantasyData';

    public endpoints: Endpoint[];

    constructor() {
        this.endpoints = this.configEndpoints();
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

            req.services.fantasyDataService.getPlayer(playerId)
                .then((playerData: any) => {
                    if (playerData) {
                        res.json(playerData);
                    } else {
                        res.sendStatus(HttpStatus.NOT_FOUND);
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
            const accessToken: string = req.services.fantasyAuthService.getAccessToken();

            if (accessToken) {
                req.services.fantasyDataService.getRankingData(leagueId, accessToken)
                    .then((data: any) => res.json(data));
            } else {
                res.json({error: 'No access token setted'});
            }
        } catch (err) {
            next(err);
        }
    };

}
