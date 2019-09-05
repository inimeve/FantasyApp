import { FantasyAuthSupplier } from './fantasy-auth-supplier'
import { Request } from 'express'

export class FantasyAuthService {

    private fantasyAuthSupplier: FantasyAuthSupplier;

    constructor() {
        this.fantasyAuthSupplier = new FantasyAuthSupplier();
    }

    public login(refreshToken: string): Promise<any> {
        return this.fantasyAuthSupplier.login(refreshToken);
    }

    public checkTokenValidity(accessToken: string): Promise<any> {
        return this.fantasyAuthSupplier.checkTokenValidity(accessToken);
    }

}
