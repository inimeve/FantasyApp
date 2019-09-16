import { FantasyTeamSupplier } from './fantasy-team.supplier';
import { FantasyTeamDTO } from './fantasy-team.model';

export class FantasyTeamService {

    private fantasyTeamSupplier: FantasyTeamSupplier

    constructor() {
        this.fantasyTeamSupplier = new FantasyTeamSupplier();
    }

    public getTeamsInLeague(leagueId: string, accessToken: string): Promise<FantasyTeamDTO[]> {
        return this.fantasyTeamSupplier.getTeamsInLeague(leagueId, accessToken);
    }

}
