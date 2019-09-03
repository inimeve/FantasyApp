import { NextFunction, Request, Response } from 'express';
import { noCache } from '../../../middlewares/NoCacheMiddleware';

import { Endpoint } from '../../../types/Endpoint';

import { FantasyTeamService } from './fantasy-team.service';

export class FantasyTeamEndpoints {

    private resourcePath: string = '/team';

    public endpoints: Endpoint[];

    private fantasyTeamService: FantasyTeamService

    constructor() {
        this.endpoints = this.configEndpoints();

        this.fantasyTeamService = new FantasyTeamService();
    }

    public configEndpoints (): Endpoint[] {
        return [
            { method: 'GET', path: `${this.resourcePath}/:leagueId`, serviceMethod: this.getRankingData, middleware: [noCache]},
        ];
    };

    public getRankingData = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const leagueId: string = req.params.leagueId;
            const accessToken: string = req.headers.authorization || '';

            this.fantasyTeamService.getRankingData(leagueId, accessToken)
                .then((rankingData: any) => res.json(rankingData))
                .catch(err => res.send(err));

        } catch (err) {
            next(err);
        }
    };

}
