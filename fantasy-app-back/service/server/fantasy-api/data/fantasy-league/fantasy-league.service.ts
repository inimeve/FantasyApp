import { FantasyLeagueSupplier } from './fantasy-league.supplier';
import { FantasyLeagueDTO } from './fantasy-league.model';

export class FantasyLeagueService {

    private fantasyLeagueRepository: FantasyLeagueSupplier;

    constructor() {
        this.fantasyLeagueRepository = new FantasyLeagueSupplier();
    }

    public async getLeagues(accessToken: string): Promise<FantasyLeagueDTO[]> {
        return this.fantasyLeagueRepository.getLeagues(accessToken);
    }

    public async getLeagueById(leagueId: string, accessToken: string): Promise<FantasyLeagueDTO> {
        return this.fantasyLeagueRepository.getLeagueById(leagueId, accessToken);
    }


}
