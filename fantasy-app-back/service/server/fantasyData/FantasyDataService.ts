import { FantasyDataRepository } from './FantasyDataRepository';

export class FantasyDataService {

    constructor(private fantasyRepository: FantasyDataRepository) {
        this.fantasyRepository = new FantasyDataRepository();
    }

    public getPlayer(playerId: number): any {
        return this.fantasyRepository.getPlayer(playerId);
    }

    public getPlayersInLeague(leagueId: string, accessToken: string): Promise<any> {
        return this.fantasyRepository.getAllPlayersInLeague(leagueId, accessToken);
    }

    public getRankingData(leagueId: string, accessToken: string): Promise<any> {
        return this.fantasyRepository.getRankingData(leagueId, accessToken);
    }

}
