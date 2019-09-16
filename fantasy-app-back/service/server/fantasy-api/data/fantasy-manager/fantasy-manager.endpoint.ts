import { NextFunction, Request, Response } from 'express';
import { noCache } from '../../../middlewares/NoCacheMiddleware';

import { Endpoint } from '../../../types/Endpoint';

import { FantasyManagerService } from './fantasy-manager.service';
import { FantasyManagerDTO } from './fantasy-manager.model';

export class FantasyManagerEndpoints {

    private resourcePath: string = '/manager';

    public endpoints: Endpoint[];

    private fantasyManagerService: FantasyManagerService

    constructor() {
        this.endpoints = this.configEndpoints();

        this.fantasyManagerService = new FantasyManagerService();
    }

    public configEndpoints (): Endpoint[] {
        return [
            { method: 'GET', path: `${this.resourcePath}/me`, serviceMethod: this.getCurrentManager, middleware: [noCache]},
        ];
    };

    public getCurrentManager  = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const accessToken: string = req.headers.authorization || '';

            this.fantasyManagerService.getCurrentManager(accessToken)
                .then((manager: FantasyManagerDTO) => res.json(manager))
                .catch(err => res.send(err));

        } catch (err) {
            next(err);
        }
    };

}
