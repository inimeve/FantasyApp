import { FantasyPlayerSupplier } from './fantasy-player.supplier';
import { FantasyPlayer } from './fantasy-player.model';
import { ServiceInjector } from '../../../utils/ServiceInjector';
import { FantasyTeamService } from '../fantasy-team/fantasy-team.service';
import { FantasyTeam } from '../fantasy-team/fantasy-team.model';

export class FantasyPlayerService {

    constructor(private fantasyPlayerRepository: FantasyPlayerSupplier) {
        this.fantasyPlayerRepository = new FantasyPlayerSupplier();

        // const injector: ServiceInjector = ServiceInjector.getInstance();
        // this.fantasyTeamService = injector.getService(FantasyTeamService);
    }

    public getPlayer(playerId: number): Promise<FantasyPlayer> {
        return this.fantasyPlayerRepository.getPlayer(playerId);
    }

    public getPlayersInLeague(leagueId: string, accessToken: string): Promise<FantasyPlayer[]> {
        return this.fantasyPlayerRepository.getAllPlayersInLeague(leagueId, accessToken);
    }

    public getTeamPlayers(leagueId: string, teamId: string, accessToken: string): Promise<FantasyPlayer[]> {
        return this.fantasyPlayerRepository.getTeamPlayers(leagueId, teamId, accessToken);
    }

    public getAllPlayersData(leagueId: string, accessToken: string): Promise<FantasyPlayer[]> {
        const injector: ServiceInjector = ServiceInjector.getInstance();
        const fantasyTeamService: FantasyTeamService = injector.getService(FantasyTeamService);

        const teamPlayerDataPromise: Promise<FantasyPlayer[]> = fantasyTeamService.getRankingData(leagueId, accessToken)
            .then((rankingData: FantasyTeam[]) => {
                const teamsPlayersPromises: Promise<FantasyPlayer[]>[] = [];

                for(let team of rankingData) {
                    let teamPlayersPromise: Promise<FantasyPlayer[]> = this.fantasyPlayerRepository.getTeamPlayers(leagueId, team.id, accessToken);
                    teamsPlayersPromises.push(teamPlayersPromise);
                }

                return Promise.all(teamsPlayersPromises)
                    .then((values: any[]) => {
                        let teamsPlayers: FantasyPlayer[] = [];

                        for(let team of values) {
                            for(let player of team.players) {
                                teamsPlayers.push(player);
                            }
                        }
                        return  teamsPlayers;
                    });
            });

        const playersInLeaguePromise: Promise<FantasyPlayer[]> = this.fantasyPlayerRepository.getAllPlayersInLeague(leagueId, accessToken)
            .then((playersData: FantasyPlayer[]) => playersData);

        return Promise.all([teamPlayerDataPromise, playersInLeaguePromise])
            .then((values: any[]) => {
                const teamsPlayerData: FantasyPlayer[] = values[0];
                let playersInLeague: FantasyPlayer[] = values[1];

                playersInLeague = playersInLeague.map(player => {
                    for(let teamPlayer of teamsPlayerData) {
                        if(player.id = teamPlayer.id) player = {...player, ...teamPlayer};
                    }
                    return player;
                });

                return playersInLeague;
            });
    }

}
