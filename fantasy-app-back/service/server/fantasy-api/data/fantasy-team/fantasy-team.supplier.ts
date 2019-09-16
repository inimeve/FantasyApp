import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { FantasyTeamAdapter, FantasyTeamDTO } from './fantasy-team.model';

export class FantasyTeamSupplier {

    public getTeamsInLeague(leagueId: string, accessToken: string): Promise<FantasyTeamDTO[]> {
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
                    return Promise.resolve(response.data.map((item: any) => FantasyTeamAdapter.toDTO(item.team)));
                } else {
                    return Promise.reject({message: 'Error in external request (' + this.constructor.name + '.getRankingData): code -> ' + response.status});
                }
            })
            .catch(error => error);
    }

}
