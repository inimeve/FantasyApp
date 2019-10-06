import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { FantasyPlayerAdapter, FantasyPlayerDomain, FantasyPlayerDTO } from './fantasy-player.model';


export class FantasyPlayerSupplier {

    public getPlayerById(playerId: number): Promise<FantasyPlayerDTO> {
        const requestConfig: AxiosRequestConfig = {
            method: 'GET',
            url: `https://api.laligafantasymarca.com/api/v3/player/${playerId}`,
        };

        return Axios(requestConfig)
            .then((response: AxiosResponse) => {
                if (response.status == 200 && response.data) {
                    return Promise.resolve(FantasyPlayerAdapter.toDTO(response.data));
                } else {
                    return Promise.reject({message: 'Error in external request (' + this.constructor.name + '.getPlayer): code -> ' + response.status});
                }
            })
            .catch(error => error);
    }

    public getPlayersInLeague(leagueId: string, accessToken: string): Promise<FantasyPlayerDTO[]> {
        if(!accessToken) return Promise.reject({message: 'Access token needed'});

        const requestConfig: AxiosRequestConfig = {
            method: 'GET',
            url: `https://api.laligafantasymarca.com/api/v3/players/league/${leagueId}`,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }

        return Axios(requestConfig)
            .then((response: AxiosResponse) => {
                if (response.status == 200 && response.data) {
                    return Promise.resolve(response.data.map((item: FantasyPlayerDomain) => FantasyPlayerAdapter.toDTO(item)));
                } else {
                    return Promise.reject({message: 'Error in external request (' + this.constructor.name + '.getAllPlayersInLeague): code -> ' + response.status});
                }
            })
            .catch(error => error);
    }

    public getPlayersInMarket(leagueId: string, accessToken: string): Promise<FantasyPlayerDTO[]> {
        if(!accessToken) return Promise.reject({message: 'Access token needed'});

        const requestConfig: AxiosRequestConfig = {
            method: 'GET',
            url: `https://api.laligafantasymarca.com/api/v3/league/${leagueId}/market`,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }

        return Axios(requestConfig)
            .then((response: AxiosResponse) => {
                if (response.status == 200 && response.data) {
                    const markerPlayer: FantasyPlayerDTO[] = response.data? response.data.map((item: any) => {
                        const fantasyPlayer: FantasyPlayerDTO = FantasyPlayerAdapter.toDTO(item.playerMaster);
                        fantasyPlayer.salePrice = item.salePrice;
                        fantasyPlayer.marketExpirationDate = item.marketExpirationDate;
                        return fantasyPlayer;
                    }): [];

                    return Promise.resolve(markerPlayer);
                } else {
                    return Promise.reject({message: 'Error in external request (' + this.constructor.name + '.getPlayersInMarket): code -> ' + response.status});
                }
            })
            .catch(error => error);
    }

    public getTeamPlayers(leagueId: string, teamId: string, accessToken: string): Promise<FantasyPlayerDTO[]> {
        if(!accessToken) return Promise.reject({message: 'Access token needed'});

        const requestConfig: AxiosRequestConfig = {
            method: 'GET',
            url: `https://api.laligafantasymarca.com/api/v3/leagues/${leagueId}/teams/${teamId}`,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        };

        return Axios(requestConfig)
            .then((response: AxiosResponse) => {
                if (response.status == 200 && response.data) {
                    const teamPlayers: FantasyPlayerDTO[] = response.data.players? response.data.players.map((item: any) => {
                        const fantasyPlayer: FantasyPlayerDTO = FantasyPlayerAdapter.toDTO(item.playerMaster);
                        fantasyPlayer.buyoutClause = item.buyoutClause;
                        fantasyPlayer.buyoutClauseLockedEndTime = item.buyoutClauseLockedEndTime;
                        fantasyPlayer.playerTeamId = teamId;
                        return fantasyPlayer;
                    }): [];

                    return Promise.resolve(teamPlayers);
                } else {
                    return Promise.reject({message: 'Error in external request (' + this.constructor.name + '.getTeamPlayers): code -> ' + response.status});
                }
            })
            .catch(error => error);
    }


}
