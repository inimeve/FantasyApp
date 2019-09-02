import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { FantasyTeam, FantasyTeamAdapter } from './fantasy-team.model'

export class FantasyTeamSupplier {

    public getRankingData(leagueId: string, accessToken: string): Promise<FantasyTeam[]> {
        if(!accessToken) return Promise.reject({message: 'Access token needed'});

        const requestConfig: AxiosRequestConfig = {
            method: 'GET',
            url: `https://api.laligafantasymarca.com/api/v4/leagues/${leagueId}/ranking`,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        };

        return Axios(requestConfig)
            .then((response: AxiosResponse) => {
                if (response.status == 200 && response.data) {
                    return Promise.resolve(response.data.map((item: any) => FantasyTeamAdapter.adapt(item)));
                } else {
                    return Promise.reject({message: 'Error in external request (' + typeof this + 'getRankingData): code -> ' + response.status});
                }
            })
            .catch(error => error);
    }

}
