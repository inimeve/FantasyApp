import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { FantasyLeague, FantasyLeagueAdapter } from './fantasy-league.model';

export class FantasyLeagueSupplier {

    public getLeagueInfo(leagueId: string, accessToken: string): Promise<FantasyLeague> {
        if(!accessToken) return Promise.reject({message: 'Access token needed'});

        const requestConfig: AxiosRequestConfig = {
            method: 'GET',
            url: `https://api.laligafantasymarca.com/api/v3/leagues/${leagueId}`,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        };

        return Axios(requestConfig)
            .then((response: AxiosResponse) => {
                if (response.status == 200 && response.data) {
                    return Promise.resolve(FantasyLeagueAdapter.adapt(response.data));
                } else {
                    return Promise.reject({message: 'Error in external request (' + typeof this + 'getLeagueInfo): code -> ' + response.status});
                }
            })
            .catch(error => error);
    }

}
