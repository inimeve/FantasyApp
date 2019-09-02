import { FantasyLeagueSupplier } from './fantasy-league.supplier';
import { FantasyLeague } from './fantasy-league.model';

export class FantasyLeagueService {

    constructor(private fantasyLeagueRepository: FantasyLeagueSupplier) {
        this.fantasyLeagueRepository = new FantasyLeagueSupplier();
    }

    public getLeagueInfo(leagueId: string, accessToken: string): Promise<FantasyLeague> {
        return this.fantasyLeagueRepository.getLeagueInfo(leagueId, accessToken);
    }

}
