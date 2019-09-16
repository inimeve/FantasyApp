import { NextFunction, Request, Response } from 'express';
import { noCache } from '../../../middlewares/NoCacheMiddleware';

import { Endpoint } from '../../../types/Endpoint';

import { FantasyLeagueService } from './fantasy-league.service';
import { FantasyLeagueDTO } from './fantasy-league.model';

export class FantasyLeagueEndpoints {

    private resourcePath: string = '/league';

    public endpoints: Endpoint[];

    private fantasyLeagueService: FantasyLeagueService

    constructor() {
        this.endpoints = this.configEndpoints();

        this.fantasyLeagueService = new FantasyLeagueService();
    }

    public configEndpoints (): Endpoint[] {
        return [
            { method: 'GET', path: `${this.resourcePath}/:leagueId`, serviceMethod: this.getLeagueById, middleware: [noCache]},
            { method: 'GET', path: `${this.resourcePath}`, serviceMethod: this.getLeagues, middleware: [noCache]},
        ];
    };

    public getLeagueById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const leagueId: string = req.params.leagueId;
            const accessToken: string = req.headers.authorization || '';

            this.fantasyLeagueService.getLeagueById(leagueId, accessToken)
                .then((league: FantasyLeagueDTO) => res.json(league))
                .catch(err => res.send(err));

        } catch (err) {
            next(err);
        }
    };

    public getLeagues = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const accessToken: string = req.headers.authorization || '';

            this.fantasyLeagueService.getLeagues(accessToken)
                .then((leagues: FantasyLeagueDTO[]) => res.json(leagues))
                .catch(err => res.send(err));

        } catch (err) {
            next(err);
        }
    }

}
