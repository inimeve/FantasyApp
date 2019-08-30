/* tslint:disable no-namespace */
import 'express'
import { FantasyDataService } from '../fantasyData/FantasyDataService';
import { FantasyAuthService } from '../fantasyAuth/FantasyAuthService'

export interface RequestServices {
    fantasyDataService: FantasyDataService,
    fantasyAuthService: FantasyAuthService
}

declare global {
    namespace Express {
        interface Request {
            services: RequestServices
        }
    }
}
