export class FantasyManager {

  public id: string;
  public managerName: string;
  public avatar: string;

  public leagues: FantasyLeague[];

}

export class FantasyLeague {

  public id: string;
  public managerNumber: number;
  public name: string;

  public team: FantasyTeam;

}

export class FantasyTeam {

  public id: string;
  public teamValue: number;
  public teamPoints: number;

  public manager: FantasyManager;

}

export class FantasyManagerDTO {

  public id: string;
  public managerName: string;
  public avatar: string;

  public leagues: FantasyLeagueDTO[];

}

export class FantasyLeagueDTO {

  public id: string;
  public managerNumber: number;
  public name: string;

  public team: FantasyTeamDTO;

}

export class FantasyTeamDTO {

  public id: string;
  public teamValue: number;
  public teamPoints: number;

  public manager: FantasyManagerDTO;

}

export class FantasyManagerAdapter {

  static adapt(item: FantasyManagerDTO): FantasyManager {
    const fantasyManager: FantasyManager = new FantasyManager();

    fantasyManager.id = item.id;
    fantasyManager.managerName = item.managerName;
    fantasyManager.avatar = item.avatar;

    fantasyManager.leagues = item.leagues;

    return fantasyManager;
  }

}
