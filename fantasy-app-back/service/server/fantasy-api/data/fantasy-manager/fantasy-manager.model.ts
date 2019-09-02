export class FantasyManager {

    constructor (
        public id: number,
        public managerName: string,
        public avatar: string,
    ) {}

}

export class FantasyManagerAdapter {

    static adapt(item: any): FantasyManager {
        return new FantasyManager(
            item.id,
            item.managerName,
            item.avatar
        );
    }

}
