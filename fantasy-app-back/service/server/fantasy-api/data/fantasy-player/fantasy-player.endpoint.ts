import { NextFunction, Request, Response } from 'express';
import { noCache } from '../../../middlewares/NoCacheMiddleware';
import { Endpoint } from '../../../types/Endpoint';
import { FantasyPlayerService } from './fantasy-player.service';

export class FantasyPlayerEndpoint {

    private resourcePath: string = '/players';

    public endpoints: Endpoint[];

    private fantasyDataService: FantasyPlayerService

    constructor() {
        this.endpoints = this.configEndpoints();

        this.fantasyDataService = new FantasyPlayerService();
    }

    public configEndpoints (): Endpoint[] {
        return [
            { method: 'GET', path: `${this.resourcePath}/player/:playerId`, serviceMethod: this.getPlayer, middleware: [noCache]},
            { method: 'GET', path: `${this.resourcePath}/league/:leagueId`, serviceMethod: this.getPlayersInLeague, middleware: [noCache]},
            { method: 'GET', path: `${this.resourcePath}/league/:leagueId/:teamId`, serviceMethod: this.getTeamPlayers, middleware: [noCache]},
            // { method: 'GET', path: `${this.resourcePath}/getAllPlayers/league/:leagueId`, serviceMethod: this.getAllPlayersData, middleware: [noCache]},
            { method: 'GET', path: `${this.resourcePath}/all/league/:leagueId`, serviceMethod: this.getAllPlayersData, middleware: [noCache]},
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

    public getTeamPlayers = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const leagueId: string = req.params.leagueId;
            const teamId: string = req.params.teamId;
            const accessToken: string = req.headers.authorization || '';

            this.fantasyDataService.getTeamPlayers(leagueId, teamId, accessToken)
                .then((playersData: any) => res.json(playersData))
                .catch(err => res.send(err));

        } catch (err) {
            next(err);
        }
    }

    public getAllPlayersData = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const leagueId: string = req.params.leagueId;
            const accessToken: string = req.headers.authorization || '';

            this.fantasyDataService.getAllPlayersData(leagueId, accessToken)
                .then((playersData: any) => res.json(playersData))
                .catch(err => res.send(err));

        } catch (err) {
            next(err);
        }
    }

}
