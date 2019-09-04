import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export class FantasyAuthSupplier {

    public getTokens(refreshToken: string): Promise<any> {
        if(!refreshToken) return Promise.reject({message: 'Refresh token needed'});

        const requestConfig: AxiosRequestConfig = {
            method: 'POST',
            url: 'https://api.laligafantasymarca.com/login/v3/refresh-token',
            data: {
                refresh_token: refreshToken,
                policy: "b2c_1a_signupsignin_gl_nl"
            },
        }

        return Axios(requestConfig)
            .then((response: AxiosResponse) => {
                if (response.status == 200 && response.data && response.data.refresh_token) {
                    return Promise.resolve(response.data);
                } else {
                    return Promise.reject({message: 'Error in external request (' + this.constructor.name + '.getPlayer): code -> ' + response.status});
                }

            })
            .catch(error => {
                return Promise.reject({message: 'Error in external request (' + this.constructor.name + '.getPlayer): code -> ' + error.response.status});
            });
    }

}
