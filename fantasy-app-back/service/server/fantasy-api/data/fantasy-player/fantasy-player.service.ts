import { FantasyPlayerSupplier } from './fantasy-player.supplier';
import { FantasyTeamService } from '../fantasy-team/fantasy-team.service';
import { FantasyPlayerDTO } from './fantasy-player.model';
import { FantasyTeamDTO } from '../fantasy-team/fantasy-team.model';

export class FantasyPlayerService {

    private fantasyPlayerSupplier: FantasyPlayerSupplier;

    private fantasyTeamService: FantasyTeamService;

    constructor() {
        this.fantasyPlayerSupplier = new FantasyPlayerSupplier();

        this.fantasyTeamService = new FantasyTeamService();
    }

    public getPlayerById(playerId: number): Promise<FantasyPlayerDTO> {
        return this.fantasyPlayerSupplier.getPlayerById(playerId);
    }

    public getPlayersInLeague(leagueId: string, accessToken: string): Promise<FantasyPlayerDTO[]> {
        return this.fantasyPlayerSupplier.getPlayersInLeague(leagueId, accessToken);
    }

    public getTeamPlayers(leagueId: string, teamId: string, accessToken: string): Promise<FantasyPlayerDTO[]> {
        return this.fantasyPlayerSupplier.getTeamPlayers(leagueId, teamId, accessToken);
    }

    public async getAllPlayersData(leagueId: string, accessToken: string): Promise<FantasyPlayerDTO[]> {
        // const teamsInLeague: FantasyTeamDTO[] = await this.fantasyTeamService.getTeamsInLeague(leagueId, accessToken);
        //
        // let playersInLeagueTeams: FantasyPlayerDTO[] = [];
        //
        // for (let team of teamsInLeague) {
        //     playersInLeagueTeams = [...playersInLeagueTeams, ...await this.fantasyPlayerSupplier.getTeamPlayers(leagueId, team.id, accessToken)];
        // }
        //
        // let playersInLeague: FantasyPlayerDTO[] = await this.fantasyPlayerSupplier.getPlayersInLeague(leagueId, accessToken);
        //
        // playersInLeague = playersInLeague.map((player: FantasyPlayerDTO) => {
        //     for (let teamPlayer of playersInLeagueTeams) {
        //         if (player.id == teamPlayer.id) player = {...player, ...teamPlayer};
        //     }
        //     return player;
        // })
        //
        // return playersInLeague;

        const teamPlayersDataPromise: Promise<FantasyPlayerDTO[]> = this.fantasyTeamService.getTeamsInLeague(leagueId, accessToken)
            .then((teams: FantasyTeamDTO[]) => {
                const teamsPlayersPromises: Promise<FantasyPlayerDTO[]>[] = [];

                for(let team of teams) {
                    let teamPlayersPromise: Promise<FantasyPlayerDTO[]> = this.fantasyPlayerSupplier.getTeamPlayers(leagueId, team.id, accessToken);
                    teamsPlayersPromises.push(teamPlayersPromise);
                }

                return Promise.all(teamsPlayersPromises)
                    .then((teams: FantasyPlayerDTO[][]) => {
                        let teamsPlayers: FantasyPlayerDTO[] = [];

                        for(let teamPlayers of teams) {
                            for(let player of teamPlayers) {
                                teamsPlayers.push(player);
                            }
                        }
                        return  teamsPlayers;
                    });
            });

        const playersInLeaguePromise: Promise<FantasyPlayerDTO[]> = this.fantasyPlayerSupplier.getPlayersInLeague(leagueId, accessToken)
            .then((playersData: FantasyPlayerDTO[]) => playersData);

        return Promise.all([teamPlayersDataPromise, playersInLeaguePromise])
            .then((values: any[]) => {
                const teamsPlayerData: FantasyPlayerDTO[] = values[0];
                let playersInLeague: FantasyPlayerDTO[] = values[1];

                playersInLeague = playersInLeague.map(player => {
                    for(let teamPlayer of teamsPlayerData) {
                        if(player.id == teamPlayer.id) player = {...player, ...teamPlayer};
                    }
                    return player;
                });

                return playersInLeague;
            });
    }

}
