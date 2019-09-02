import { NextFunction, Request, Response } from 'express';
import { noCache } from '../../../middlewares/NoCacheMiddleware';

import { Endpoint } from '../../../types/Endpoint';
import { ServiceInjector } from '../../../utils/ServiceInjector';

import { FantasyLeagueService } from './fantasy-league.service';

export class FantasyLeagueEndpoints {

    private resourcePath: string = '/league';

    public endpoints: Endpoint[];

    constructor(private fantasyLeagueService: FantasyLeagueService) {
        this.endpoints = this.configEndpoints();

        const injector: ServiceInjector = ServiceInjector.getInstance();
        this.fantasyLeagueService = injector.getService(FantasyLeagueService);
    }

    public configEndpoints (): Endpoint[] {
        return [
            { method: 'GET', path: `${this.resourcePath}/:leagueId`, serviceMethod: this.getLeagueInfo, middleware: [noCache]},
        ];
    };

    public getLeagueInfo  = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const leagueId: string = req.params.leagueId;
            const accessToken: string = req.headers.authorization || '';

            this.fantasyLeagueService.getLeagueInfo(leagueId, accessToken)
                .then((leagueData: any) => res.json(leagueData))
                .catch(err => res.send(err));

        } catch (err) {
            next(err);
        }
    };

}
