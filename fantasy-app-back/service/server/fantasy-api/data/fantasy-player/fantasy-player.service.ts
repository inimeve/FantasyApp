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



    public getPlayerValueHistory(playerId: string): Promise<FantasyPlayerDTO> {
        return this.fantasyPlayerSupplier.getPlayerValueHistory(playerId);
    }

    public getPlayersInLeague(leagueId: string, accessToken: string): Promise<FantasyPlayerDTO[]> {
        return this.fantasyPlayerSupplier.getPlayersInLeague(leagueId, accessToken);
    }


    public getPlayerById(playerId: string): Promise<any> {
        const playerDataPromise: Promise<FantasyPlayerDTO> = this.fantasyPlayerSupplier.getPlayerById(playerId);

        const playerMarketValuePromise: Promise<any> = this.fantasyPlayerSupplier.getPlayerValueHistory(playerId);

        return Promise.all([playerDataPromise, playerMarketValuePromise])
            .then((data: [FantasyPlayerDTO, any]) => {
                const playerData: FantasyPlayerDTO = data[0];
                const playerMarketData: any = data[1];

                playerData.marketValueHistory = playerMarketData.marketValueHistory;

                return Promise.resolve(JSON.parse(JSON.stringify(playerData)));
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    }

    public async getTeamPlayers(leagueId: string, teamId: string, accessToken: string): Promise<FantasyPlayerDTO[]> {
        return this.fantasyPlayerSupplier.getTeamPlayers(leagueId, teamId, accessToken)
            .then(async (teamPlayersData: FantasyPlayerDTO[]) => {
                const teamPlayersDecorated: FantasyPlayerDTO[] = [];

                for (let player of teamPlayersData) {
                    const decoratedPlayer: FantasyPlayerDTO = await this.getPlayerById(player.id);
                    decoratedPlayer.playerTeamId = teamId;
                    teamPlayersDecorated.push({...player, ...decoratedPlayer});
                }

                return teamPlayersDecorated;
            });

    }

    public async getAllPlayersData(leagueId: string, accessToken: string): Promise<FantasyPlayerDTO[]> {
        return this.fantasyTeamService.getTeamsInLeague(leagueId, accessToken)
            .then((teams: FantasyTeamDTO[]) => {
               const teamsPlayersPromises: Promise<any>[] = [];

               for(let team of teams) {
                   const teamPlayersPromise: Promise<FantasyPlayerDTO[]> = this.getTeamPlayers(leagueId, team.id, accessToken);
                   teamsPlayersPromises.push(teamPlayersPromise);
               }

               const marketPlayersPromise: Promise<FantasyPlayerDTO[]> = this.getPlayersInMarket(leagueId, accessToken);

               return Promise.all([...teamsPlayersPromises, marketPlayersPromise])
                   .then((teamsPlayerData: any[]) => {
                       let allPlayersData: FantasyPlayerDTO[] = []
                       for(let teamPlayers of teamsPlayerData) {
                           allPlayersData = [...allPlayersData, ...teamPlayers];
                       }
                       return allPlayersData;
                   });
            });
    }

    public getPlayersInMarket(leagueId: string, accessToken: string): Promise<FantasyPlayerDTO[]> {
        return this.fantasyPlayerSupplier.getPlayersInMarket(leagueId, accessToken)
            .then((marketPlayersData: FantasyPlayerDTO[]) => {
                const marketPlayersPromises: Promise<FantasyPlayerDTO>[] = [];

                for(let player of marketPlayersData) {
                    if(!player.sellerTeam) {
                        const playerPromise: Promise<FantasyPlayerDTO> = this.getPlayerById(player.id);
                        marketPlayersPromises.push(playerPromise);
                    }
                }

                return Promise.all(marketPlayersPromises)
                    .then((playersData: FantasyPlayerDTO[]) => {
                        const allPlayersData: FantasyPlayerDTO[] = [];

                        for(let player of playersData) {
                            const teamPlayer: FantasyPlayerDTO | undefined = marketPlayersData.find(teamPlayer => teamPlayer.id === player.id);
                            if(teamPlayer) player = {...player, ...JSON.parse(JSON.stringify(teamPlayer))};
                            allPlayersData.push(player);
                        }
                        return allPlayersData;
                    });
            });
    }

}
