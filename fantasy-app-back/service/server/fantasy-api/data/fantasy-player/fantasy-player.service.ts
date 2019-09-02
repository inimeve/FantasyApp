import { FantasyPlayerSupplier } from './fantasy-player.supplier';
import { FantasyPlayer } from './fantasy-player.model'

export class FantasyPlayerService {

    constructor(private fantasyPlayerRepository: FantasyPlayerSupplier) {
        this.fantasyPlayerRepository = new FantasyPlayerSupplier();
    }

    public getPlayer(playerId: number): Promise<FantasyPlayer> {
        return this.fantasyPlayerRepository.getPlayer(playerId);
    }

    public getPlayersInLeague(leagueId: string, accessToken: string): Promise<FantasyPlayer[]> {
        return this.fantasyPlayerRepository.getAllPlayersInLeague(leagueId, accessToken);
    }

}
