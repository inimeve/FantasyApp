import { NextFunction, Request, Response } from 'express';
import { noCache } from '../../../middlewares/NoCacheMiddleware';
import { Endpoint } from '../../../types/Endpoint'
import { FantasyPlayerService } from './fantasy-player.service'
import { ServiceInjector } from '../../../utils/ServiceInjector'

export class FantasyPlayerEndpoint {

    private resourcePath: string = '/player';

    public endpoints: Endpoint[];

    constructor(private fantasyDataService: FantasyPlayerService) {
        this.endpoints = this.configEndpoints();

        const injector: ServiceInjector = ServiceInjector.getInstance();
        this.fantasyDataService = injector.getService(FantasyPlayerService);
    }

    public configEndpoints (): Endpoint[] {
        return [
            { method: 'GET', path: `${this.resourcePath}/:playerId`, serviceMethod: this.getPlayer, middleware: [noCache]},
            { method: 'GET', path: `${this.resourcePath}/league/:leagueId`, serviceMethod: this.getPlayersInLeague, middleware: [noCache]},
        ];
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

}
