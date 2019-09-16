import { FantasyManagerSupplier } from './fantasy-manager.supplier';
import { FantasyManagerDTO } from './fantasy-manager.model';
import { FantasyLeagueDTO } from '../fantasy-league/fantasy-league.model';
import { FantasyLeagueService } from '../fantasy-league/fantasy-league.service';

export class FantasyManagerService {

    private fantasyManagerRepository: FantasyManagerSupplier;

    private fantasyLeagueService: FantasyLeagueService;

    constructor() {
        this.fantasyManagerRepository = new FantasyManagerSupplier();
        this.fantasyLeagueService = new FantasyLeagueService();
    }

    public async getCurrentManager(accessToken: string): Promise<FantasyManagerDTO> {
        const fantasyManager: FantasyManagerDTO = await this.fantasyManagerRepository.getCurrentManagerInfo(accessToken);

        const fantasyLeagues: FantasyLeagueDTO[] = await this.fantasyLeagueService.getLeagues(accessToken);

        fantasyManager.leagues = fantasyLeagues;

        return fantasyManager;
    }

}
