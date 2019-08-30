import { FantasyDataRepository } from './FantasyDataRepository';

export class FantasyDataService {

    constructor(private fantasyRepository: FantasyDataRepository) {}

    public getPlayer(playerId: number): any {
        return this.fantasyRepository.getPlayer(playerId);
    }

    public getRankingData(leagueId: string, accessToken: string): any {
        return this.fantasyRepository.getRankingData(leagueId, accessToken);
    }

}
