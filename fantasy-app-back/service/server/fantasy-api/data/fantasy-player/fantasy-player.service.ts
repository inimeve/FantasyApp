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





    // ******************

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
            .then((teamPlayersData: FantasyPlayerDTO[]) => {
                const teamPlayerPromises: Promise<FantasyPlayerDTO>[] = [];

                for(let player of teamPlayersData) {
                    const playerPromise: Promise<FantasyPlayerDTO> = this.getPlayerById(player.id);
                    teamPlayerPromises.push(playerPromise);
                }

                return Promise.all(teamPlayerPromises)
                    .then((playersData: FantasyPlayerDTO[]) => {
                        const allPlayersData: FantasyPlayerDTO[] = [];

                        for(let player of playersData) {
                            const teamPlayer: FantasyPlayerDTO | undefined = teamPlayersData.find(teamPlayer => teamPlayer.id === player.id);
                            if(teamPlayer) player = {...player, ...JSON.parse(JSON.stringify(teamPlayer))};
                            player.playerTeamId = teamId;
                            allPlayersData.push(player);
                        }
                        return allPlayersData;
                    });
            });

        // const teamPlayerData: FantasyPlayerDTO[] = await this.fantasyPlayerSupplier.getTeamPlayers(leagueId, teamId, accessToken);
        //
        // const allPlayerData: FantasyPlayerDTO[] = [];
        // for(let player of teamPlayerData) {
        //     let playerData: FantasyPlayerDTO = {...player, ... await this.getPlayerById(player.id)};
        //     allPlayerData.push(playerData);
        // }
        //
        // return allPlayerData;
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


        // const teamPlayersDataPromise: Promise<FantasyPlayerDTO[]> = this.fantasyTeamService.getTeamsInLeague(leagueId, accessToken)
        //     .then((teams: FantasyTeamDTO[]) => {
        //         const teamsPlayersPromises: Promise<FantasyPlayerDTO[]>[] = [];
        //
        //         for(let team of teams) {
        //             let teamPlayersPromise: Promise<FantasyPlayerDTO[]> = this.fantasyPlayerSupplier.getTeamPlayers(leagueId, team.id, accessToken);
        //             teamsPlayersPromises.push(teamPlayersPromise);
        //         }
        //
        //         return Promise.all(teamsPlayersPromises)
        //             .then((teams: FantasyPlayerDTO[][]) => {
        //                 let teamsPlayers: FantasyPlayerDTO[] = [];
        //
        //                 for(let teamPlayers of teams) {
        //                     for(let player of teamPlayers) {
        //                         teamsPlayers.push(player);
        //                     }
        //                 }
        //                 return  teamsPlayers;
        //             });
        //     });
        //
        // const playersInLeaguePromise: Promise<FantasyPlayerDTO[]> = this.fantasyPlayerSupplier.getPlayersInLeague(leagueId, accessToken)
        //     .then((playersData: FantasyPlayerDTO[]) => {
        //         return playersData;
        //     });
        //
        // const marketPlayerInLeague: Promise<FantasyPlayerDTO[]> = this.fantasyPlayerSupplier.getPlayersInMarket(leagueId, accessToken)
        //     .then(playerData => playerData);
        //
        //
        // return Promise.all([teamPlayersDataPromise, playersInLeaguePromise, marketPlayerInLeague])
        //     .then((values: any[]) => {
        //         const teamsPlayerData: FantasyPlayerDTO[] = values[0];
        //         let playersInLeague: FantasyPlayerDTO[] = values[1];
        //         const playersInMarket: FantasyPlayerDTO[] = values[2];
        //
        //         playersInLeague = playersInLeague.map(player => {
        //             for(let teamPlayer of teamsPlayerData) {
        //                 if(player.id == teamPlayer.id) player = {...player, ...teamPlayer};
        //
        //                 const playerInMarket = playersInMarket.find(item => item.id === player.id);
        //                 if(playerInMarket) player = {...player, ...playerInMarket};
        //             }
        //             return player;
        //         });
        //
        //         return playersInLeague;
        //     });
    }

    public getPlayersInMarket(leagueId: string, accessToken: string): Promise<FantasyPlayerDTO[]> {
        return this.fantasyPlayerSupplier.getPlayersInMarket(leagueId, accessToken)
            .then((marketPlayersData: FantasyPlayerDTO[]) => {
                const marketPlayersPromises: Promise<FantasyPlayerDTO>[] = [];

                for(let player of marketPlayersData) {
                    const playerPromise: Promise<FantasyPlayerDTO> = this.getPlayerById(player.id);
                    marketPlayersPromises.push(playerPromise);
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
