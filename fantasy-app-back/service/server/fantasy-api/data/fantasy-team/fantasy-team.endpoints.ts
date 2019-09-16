import { NextFunction, Request, Response } from 'express';
import { noCache } from '../../../middlewares/NoCacheMiddleware';

import { Endpoint } from '../../../types/Endpoint';

import { FantasyTeamService } from './fantasy-team.service';
import { FantasyTeamDTO } from './fantasy-team.model';

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
            { method: 'GET', path: `${this.resourcePath}/league/:leagueId`, serviceMethod: this.getTeamsInLeague, middleware: [noCache]},
        ];
    };

    public getTeamsInLeague = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const leagueId: string = req.params.leagueId;
            const accessToken: string = req.headers.authorization || '';

            this.fantasyTeamService.getTeamsInLeague(leagueId, accessToken)
                .then((teamsData: FantasyTeamDTO[]) => res.json(teamsData))
                .catch(err => res.send(err));

        } catch (err) {
            next(err);
        }
    };

}
