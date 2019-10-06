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

    public getPlayerValueHistory(playerId: string): Promise<FantasyPlayerDTO> {
        return this.fantasyPlayerSupplier.getPlayerValueHistory(playerId);
    }

    public getPlayersInLeague(leagueId: string, accessToken: string): Promise<FantasyPlayerDTO[]> {
        return this.fantasyPlayerSupplier.getPlayersInLeague(leagueId, accessToken);
    }

    public getTeamPlayers(leagueId: string, teamId: string, accessToken: string): Promise<FantasyPlayerDTO[]> {
        return this.fantasyPlayerSupplier.getTeamPlayers(leagueId, teamId, accessToken);
    }

    public getPlayersInMarket(leagueId: string, accessToken: string): Promise<FantasyPlayerDTO[]> {
        return this.fantasyPlayerSupplier.getPlayersInMarket(leagueId, accessToken);
    }

    public async getAllPlayersData(leagueId: string, accessToken: string): Promise<FantasyPlayerDTO[]> {
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
            .then((playersData: FantasyPlayerDTO[]) => {
                const allPlayerPromises: Promise<FantasyPlayerDTO>[] = [];

                for (let player of playersData) {
                    let playerPromise: Promise<FantasyPlayerDTO> = this.fantasyPlayerSupplier.getPlayerValueHistory(player.id);
                    allPlayerPromises.push(playerPromise);
                }

                return Promise.all(allPlayerPromises)
                    .then((data: FantasyPlayerDTO[]) => {
                        for (let i = 0; i < playersData.length; i++) {
                            playersData[i].marketValueHistory = data[i];
                        }
                        return playersData;
                    });
            });

        const marketPlayerInLeague: Promise<FantasyPlayerDTO[]> = this.fantasyPlayerSupplier.getPlayersInMarket(leagueId, accessToken)
            .then(playerData => playerData);


        return Promise.all([teamPlayersDataPromise, playersInLeaguePromise, marketPlayerInLeague])
            .then((values: any[]) => {
                const teamsPlayerData: FantasyPlayerDTO[] = values[0];
                let playersInLeague: FantasyPlayerDTO[] = values[1];
                const playersInMarket: FantasyPlayerDTO[] = values[2];

                playersInLeague = playersInLeague.map(player => {
                    for(let teamPlayer of teamsPlayerData) {
                        if(player.id == teamPlayer.id) player = {...player, ...teamPlayer};

                        const playerInMarket = playersInMarket.find(item => item.id === player.id);
                        if(playerInMarket) player = {...player, ...playerInMarket};
                    }
                    return player;
                });

                return playersInLeague;
            });
    }

}
