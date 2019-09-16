import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { FantasyLeagueAdapter, FantasyLeagueDomain, FantasyLeagueDTO } from './fantasy-league.model';


export class FantasyLeagueSupplier {

    public getLeagues(accessToken: string): Promise<FantasyLeagueDTO[]> {
        if(!accessToken) return Promise.reject({message: 'Access token needed'});

        const requestConfig: AxiosRequestConfig = {
            method: 'GET',
            url: `https://api.laligafantasymarca.com/api/v4/leagues`,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        };

        return Axios(requestConfig)
            .then((response: AxiosResponse) => {
                if (response.status == 200 && response.data) {
                    return Promise.resolve(response.data.map((item: FantasyLeagueDomain) => FantasyLeagueAdapter.toDTO(item)));
                } else {
                    return Promise.reject({message: 'Error in external request (' + typeof this + 'getLeague): code -> ' + response.status});
                }
            })
            .catch((error: any) => error);
    }

    public getLeagueById(leagueId: string, accessToken: string): Promise<FantasyLeagueDTO> {
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
                    return Promise.resolve(FantasyLeagueAdapter.toDTO(response.data));
                } else {
                    return Promise.reject({message: 'Error in external request (' + typeof this + 'getLeagueById): code -> ' + response.status});
                }
            })
            .catch(error => error);
    }

}
