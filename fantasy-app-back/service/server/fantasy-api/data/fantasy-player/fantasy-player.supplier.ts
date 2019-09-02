import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

import { FantasyPlayer, FantasyPlayerAdapter } from './fantasy-player.model'

export class FantasyPlayerSupplier {

    public getPlayer(playerId: number): Promise<FantasyPlayer> {
        const requestConfig: AxiosRequestConfig = {
            method: 'GET',
            url: `https://api.laligafantasymarca.com/api/v3/player/${playerId}`,
        };

        return Axios(requestConfig)
            .then((response: AxiosResponse) => {
                if (response.status == 200 && response.data) {
                    return Promise.resolve(FantasyPlayerAdapter.adapt(response.data));
                } else {
                    return Promise.reject({message: 'Error in external request (' + typeof this + 'getPlayer): code -> ' + response.status});
                }
            })
            .catch(error => error);
    }

    public getAllPlayersInLeague(leagueId: string, accessToken: string): Promise<FantasyPlayer[]> {
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
                    return Promise.resolve(response.data.map((item: any) => FantasyPlayerAdapter.adapt(item)));
                } else {
                    return Promise.reject({message: 'Error in external request (' + typeof this + 'getAllPlayersInLeague): code -> ' + response.status});
                }
            })
            .catch(error => error);
    }

}
