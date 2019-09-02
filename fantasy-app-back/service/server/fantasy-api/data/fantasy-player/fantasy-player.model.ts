export class FantasyPlayer {

    constructor (
        public id: number,
        public nickname: string,
        public playerStatus: string,
        public points: number,
        public marketValue: number,
        public positionId: number
    ) {}

}

export class FantasyPlayerAdapter {

    static adapt(item: any): FantasyPlayer {
        return new FantasyPlayer(
            item.id,
            item.nickname,
            item.playerStatus,
            item.points,
            item.marketValue,
            item.positionId
        );
    }

}
