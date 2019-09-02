import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { FantasyManager, FantasyManagerAdapter } from './fantasy-manager.model'

export class FantasyManagerSupplier {

    public getCurrentManagerInfo(accessToken: string): Promise<FantasyManager> {
        if(!accessToken) return Promise.reject({message: 'Access token needed'});

        const requestConfig: AxiosRequestConfig = {
            method: 'GET',
            url: `https://api.laligafantasymarca.com/api/v3/user/me`,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        };

        return Axios(requestConfig)
            .then((response: AxiosResponse) => {
                if (response.status == 200 && response.data) {
                    return Promise.resolve(FantasyManagerAdapter.adapt(response.data));
                } else {
                    return Promise.reject({message: 'Error in external request (' + typeof this + 'getCurrentManagerInfo): code -> ' + response.status});
                }
            })
            .catch(error => error);
    }

}
