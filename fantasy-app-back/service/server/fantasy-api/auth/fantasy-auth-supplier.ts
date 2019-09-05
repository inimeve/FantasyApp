import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export class FantasyAuthSupplier {

    public login(refreshToken: string): Promise<any> {
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
                    return Promise.resolve({token: response.data});
                } else {
                    return Promise.reject({message: 'Error in external request (' + this.constructor.name + '.login): code -> ' + response.status});
                }
            })
            .catch(error => {
                return Promise.reject({message: 'Error in external request (' + this.constructor.name + '.login): code -> ' + error.response.status});
            });
    }

    public checkTokenValidity(accessToken: string): Promise<any> {
        const requestConfig: AxiosRequestConfig = {
            method: 'GET',
            url: 'https://api.laligafantasymarca.com/api/v3/user/me',
            headers: {
                authorization: `Bearer ${accessToken}`,
            },
        };

        return Axios(requestConfig)
            .then((response: AxiosResponse) => {
                if (response.status == 200 && response.data && response.data.id) {
                    return Promise.resolve(response.data);
                } else {
                    return Promise.reject({message: 'Error in external request (' + this.constructor.name + '.checkTokenValidity): code -> ' + response.status});
                }
            })
            .catch(error => {
                return Promise.reject({message: 'Error in external request (' + this.constructor.name + '.checkTokenValidity): code -> ' + error.response.status});
            });
    }

}
