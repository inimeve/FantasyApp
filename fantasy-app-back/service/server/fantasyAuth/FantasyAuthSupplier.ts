import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

export class FantasyAuthSupplier {

    public refreshAccessToken(refreshToken: string): Promise<any> {
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
                if( response.status == 200 ||
                    response.status == 201 ||
                    response.status == 202 ||
                    response.status == 203 ||
                    response.status == 204) {
                    return response;
                } else {
                    Promise.reject(response);
                }
            })
            .catch((error: AxiosError) => {
                return Promise.reject(error.response || error.code);
            });
    }

}
