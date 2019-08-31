import { FantasyDataRepository } from './FantasyDataRepository';

export class FantasyDataService {

    public count: number = 0;

    constructor(private fantasyRepository: FantasyDataRepository) {
        this.fantasyRepository = new FantasyDataRepository();
    }

    public getPlayer(playerId: number): any {
        this.count++;
        return this.fantasyRepository.getPlayer(playerId);
    }

    public getRankingData(leagueId: string, accessToken: string): any {
        return this.fantasyRepository.getRankingData(leagueId, accessToken);
    }

}
