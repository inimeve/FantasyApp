import { NextFunction, Request, Response } from 'express';
import { noCache } from '../middlewares/NoCacheMiddleware';
import { Endpoint } from '../types/Endpoint'
import { FantasyDataService } from './FantasyDataService'
import { ServiceInjector } from '../utils/ServiceInjector'

export class FantasyDataEndpoints {

    private resourcePath: string = '/fantasy';

    public endpoints: Endpoint[];

    constructor(private fantasyDataService: FantasyDataService) {
        this.endpoints = this.configEndpoints();

        const injector: ServiceInjector = ServiceInjector.getInstance();
        this.fantasyDataService = injector.getService(FantasyDataService);
    }

    public configEndpoints (): Endpoint[] {
        return [
            { method: 'GET', path: `${this.resourcePath}/player/:playerId`, serviceMethod: this.getPlayer, middleware: [noCache]},
            { method: 'GET', path: `${this.resourcePath}/players/:leagueId`, serviceMethod: this.getPlayersInLeague, middleware: [noCache]},
            { method: 'GET', path: `${this.resourcePath}/ranking/:leagueId`, serviceMethod: this.getRankingData, middleware: [noCache]},        ]
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

    public getPlayersInLeague = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const leagueId: string = req.params.leagueId;
            const accessToken: string = req.headers.authorization || '';

            this.fantasyDataService.getPlayersInLeague(leagueId, accessToken)
                .then((playersData: any) => res.json(playersData))
                .catch(err => res.send(err));

        } catch (err) {
            next(err);
        }
    }

    public getRankingData = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const leagueId: string = req.params.leagueId;
            const accessToken: string = req.headers.authorization || '';

            this.fantasyDataService.getRankingData(leagueId, accessToken)
                .then((rankingData: any) => res.json(rankingData))
                .catch(err => res.send(err));

        } catch (err) {
            next(err);
        }
    };

}
