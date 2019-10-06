export class FantasyPlayerAdapter {

    static toDTO(item: FantasyPlayerDomain): FantasyPlayerDTO {

        const fantasyPlayerDto: FantasyPlayerDTO = new FantasyPlayerDTO();

        fantasyPlayerDto.points = item.points;
        fantasyPlayerDto.weekPoints = item.weekPoints;
        fantasyPlayerDto.averagePoints = item.averagePoints;
        fantasyPlayerDto.images = item.images;
        fantasyPlayerDto.id = item.id;
        fantasyPlayerDto.team = item.team;
        fantasyPlayerDto.name = item.name;
        fantasyPlayerDto.lastSeasonPoints = item.lastSeasonPoints;
        fantasyPlayerDto.nickname = item.nickname;
        fantasyPlayerDto.slug = item.slug;
        fantasyPlayerDto.birthDate = item.birthDate;
        fantasyPlayerDto.birthplace = item.birthplace;
        fantasyPlayerDto.positionId = item.positionId;
        fantasyPlayerDto.position = item.position;
        fantasyPlayerDto.height = item.height;
        fantasyPlayerDto.playerStats = item.playerStats;
        fantasyPlayerDto.marketValue = item.marketValue;
        fantasyPlayerDto.playerStatus = item.playerStatus;

        fantasyPlayerDto.buyoutClause = item.buyoutClause;
        // fantasyPlayerDto.playerTeamId = item.playerTeamId;
        fantasyPlayerDto.buyoutClauseLockedEndTime = item.buyoutClauseLockedEndTime;

        fantasyPlayerDto.salePrice = item.salePrice;
        fantasyPlayerDto.marketExpirationDate = item.marketExpirationDate;

        fantasyPlayerDto.marketValueHistory = item.marketValueHistory;

        return fantasyPlayerDto;
    }

}

export class FantasyPlayerDomain {

    public points: number;
    public weekPoints: number;
    public averagePoints: number;
    public images: any;
    public id: string;
    public team: any;
    public name: string;
    public lastSeasonPoints: number;
    public nickname: string;
    public slug: string;
    public birthDate: string;
    public birthplace: string;
    public positionId: number;
    public position: string;
    public height: number;
    public playerStats: any;
    public marketValue: number;
    public playerStatus: string;

    public buyoutClause: number;
    public playerTeamId: string;
    public buyoutClauseLockedEndTime: string;

    public salePrice: number;
    public marketExpirationDate: string;

    public marketValueHistory: any[];

    constructor() {}

}

export class FantasyPlayerDTO {

    public points: number;
    public weekPoints: number;
    public averagePoints: number;
    public images: any;
    public id: string;
    public team: any;
    public name: string;
    public lastSeasonPoints: number;
    public nickname: string;
    public slug: string;
    public birthDate: string;
    public birthplace: string;
    public positionId: number;
    public position: string;
    public height: number;
    public playerStats: any;
    public marketValue: number;
    public playerStatus: string;

    public buyoutClause: number;
    public playerTeamId: string;
    public buyoutClauseLockedEndTime: string;

    public salePrice: number;
    public marketExpirationDate: string;

    public marketValueHistory: any[];

    constructor() {}

}


