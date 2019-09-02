import { FantasyTeamSupplier } from './fantasy-team.supplier';
import { FantasyTeam } from './fantasy-team.model'

export class FantasyTeamService {

    constructor(private fantasyTeamRepository: FantasyTeamSupplier) {
        this.fantasyTeamRepository = new FantasyTeamSupplier();
    }

    public getRankingData(leagueId: string, accessToken: string): Promise<FantasyTeam[]> {
        return this.fantasyTeamRepository.getRankingData(leagueId, accessToken);
    }

}
