import fetch from 'node-fetch';

export class FantasyRepository {

    public getPlayer(): any {
        return fetch('https://api.laligafantasymarca.com/api/v3/player/573')
            .then((response) => {
                return response.json();
            })
    }

}
