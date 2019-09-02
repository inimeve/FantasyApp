export class FantasyLeague {

    constructor (
        public id: number,
        public managersNumber: number,
        public name: string,
    ) {}

}

export class FantasyLeagueAdapter {

    static adapt(item: any): FantasyLeague {
        return new FantasyLeague(
            item.id,
            item.managersNumber,
            item.name
        );
    }

}
