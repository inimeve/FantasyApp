import fetch, { Headers } from 'node-fetch';
import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

export class FantasyDataRepository {

    public getPlayer(playerId: number): Promise<any> {
        return fetch(`https://api.laligafantasymarca.com/api/v3/player/${playerId}`)
            .then((response) => {
                return response.json();
            })
    }

    public getRankingData(leagueId: string, accessToken: string): Promise<any> {
        const requestConfig: AxiosRequestConfig = {
            method: 'GET',
            url: `https://api.laligafantasymarca.com/api/v4/leagues/${leagueId}/ranking`,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }

        return Axios(requestConfig)
            .then((response) => response.data)
            .catch(error => error);
    }

}