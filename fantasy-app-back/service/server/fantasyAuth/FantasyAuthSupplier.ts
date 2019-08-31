import Axios, { AxiosRequestConfig } from 'axios'

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
            .then(response => response.data)
            .catch(error => error);
    }

}
