/* tslint:disable no-namespace */
import 'express'
import { CatService } from '../cats/CatService'
import { FantasyService } from '../fantasy/FantasyService';

export interface RequestServices {
    catService: CatService,
    fantasyService: FantasyService
}

declare global {
    namespace Express {
        interface Request {
            services: RequestServices
        }
    }
}
