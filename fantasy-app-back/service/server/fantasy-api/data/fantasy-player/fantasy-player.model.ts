export class FantasyPlayerAdapter {
    static adapt(item: any): FantasyPlayer {
        let fantasyPlayer: FantasyPlayer = new FantasyPlayer();
        fantasyPlayer.id = item.id;
        fantasyPlayer.nickname = item.nickname;
        fantasyPlayer.points = item.points;
        fantasyPlayer.positionId = item.positionId;
        fantasyPlayer.marketValue = item.marketValue;
        fantasyPlayer.name = item.name;
        fantasyPlayer.weekPoints = item.weekPoints;
        fantasyPlayer.team = item.team;
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

    public id!: number;
    public nickname!: string;
    public points!: number;
    public positionId!: number;
    public marketValue!: number;

    public name!: string;
    public weekPoints!: number;
    public averagePoints!: number;
    public team!: any;
    public lastSeasonPoints!: number;
    public position!: string;
    public playerStats!: any[];
    public playerStatus!: string;
    public buyoutClause!: number;
    public playerTeamId!: string;
    public buyoutClauseLockedEndTime!: string;

    constructor () {}

}
