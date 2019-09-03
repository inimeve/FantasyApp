import { FantasyAuthSupplier } from './FantasyAuthSupplier'
import { Request } from 'express'

export class FantasyAuthService {

    private fantasyAuthSupplier: FantasyAuthSupplier;

    constructor() {
        this.fantasyAuthSupplier = new FantasyAuthSupplier();
    }

    public getTokens(refreshToken: string) {
        return this.fantasyAuthSupplier.getTokens(refreshToken);
    }

    public getAuthHeader(request: Request): string {
        return request.headers.authorization || '';
    }

}
