import { FantasyTeamSupplier } from './fantasy-team.supplier';
import { FantasyTeam } from './fantasy-team.model'

export class FantasyTeamService {

    private fantasyTeamSupplier: FantasyTeamSupplier

    constructor() {
        this.fantasyTeamSupplier = new FantasyTeamSupplier();
    }

    public getRankingData(leagueId: string, accessToken: string): Promise<FantasyTeam[]> {
        return this.fantasyTeamSupplier.getRankingData(leagueId, accessToken);
    }

}
