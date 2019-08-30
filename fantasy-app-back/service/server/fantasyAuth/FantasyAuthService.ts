import { FantasyAuthSupplier } from './FantasyAuthSupplier'

export class FantasyAuthService {

    private access_token: string = '';
    private refresh_token: string = '';

    constructor(private fantasyAuthSupplier: FantasyAuthSupplier) {}

    public refreshAccessToken(refreshToken: string) {
        return this.fantasyAuthSupplier.refreshAccessToken(refreshToken)
            .then(response => {
                if (response.data && response.data.access_token && response.data.refresh_token) {
                    this.access_token = response.data.access_token;
                    this.refresh_token = response.data.refresh_token;
                }
                return response.data;
            })
            .catch(err => {
                return err;
            });
    }

    public getRefreshToken(): string {
        return `Token: ${this.access_token}`;
    }

    public getAccessToken(): string {
        return this.access_token;
    }

}
