export class FantasyPlayerAdapter {
    static adapt(item: any): FantasyPlayer {
        let fantasyPlayer: FantasyPlayer = new FantasyPlayer(
            item.id,
            item.nickname,
            item.points,
            item.team,
            item.positionId,
            item.marketValue);

        fantasyPlayer.name = item.name;
        fantasyPlayer.weekPoints = item.weekPoints;
        fantasyPlayer.averagePoints = item.averagePoints;
        fantasyPlayer.lastSeasonPoints = item.lastSeasonPoints;
        fantasyPlayer.position = item.position;
        fantasyPlayer.playerStats = item.playerStats;
        fantasyPlayer.playerStatus = item.playerStatus;

        fantasyPlayer.buyoutClause = item.buyoutClause;
        fantasyPlayer.playerTeamId = item.playerTeamId;
        fantasyPlayer.buyoutClauseLockedEndTime = item.buyoutClauseLockedEndTime;

        return fantasyPlayer;
    }
}

export class FantasyPlayer {

    public id: number;
    public name?: string;
    public nickname: string;
    public points: number;
    public weekPoints?: number;
    public averagePoints?: number;
    public team: any;
    public lastSeasonPoints?: number;
    public positionId: number;
    public position?: string;
    public playerStats?: any[];
    public marketValue: number;
    public playerStatus?: string;
    public buyoutClause?: number;
    public playerTeamId?: string;
    public buyoutClauseLockedEndTime?: string;

    constructor (
        id: number,
        nickname: string,
        points: number,
        team: string,
        positionId: number,
        marketValue: number
    ) {
        this.id = id;
        this.nickname = nickname;
        this.points = points;
        this.team = team;
        this.positionId = positionId;
        this.marketValue = marketValue;

        // this.name = this.nickname;
        // this.weekPoints = 0;
        // this.averagePoints = -1;
        // this.lastSeasonPoints = -1;
        // this.position = '';
        // this.playerStats = [];
        // this.playerStatus = '';
        //
        // this.buyoutClause = -1;
        // this.playerTeamId = '';
        // this.buyoutClauseLockedEndTime = '';
    }

}
