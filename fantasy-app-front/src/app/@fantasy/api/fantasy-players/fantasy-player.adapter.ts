import { FantasyPlayer } from './fantasy-player.model';

export enum FantasyPlayerPosition {
  forward = 4,
  midfielder = 3,
  defense = 2,
  goalkepper = 1,
}

export enum FantasyPlayerStatus {
  ok = 'ok',
  injured = 'injured',
  doubtful = 'doubtful',
  suspended = 'suspended',
}

export class FantasyPlayerAdapter {

  static adapt(item: any): FantasyPlayer {
    const adaptedPlayer: FantasyPlayer = new FantasyPlayer(item.id, item.points, item.team, Number.parseInt(item.positionId), item.name);
    adaptedPlayer.nickname = item.nickname;
    adaptedPlayer.marketValue = Number.parseInt(item.marketValue);
    adaptedPlayer.averagePoints = item.averagePoints;
    adaptedPlayer.lastSeasonPoints = item.lastSeasonPoints;
    adaptedPlayer.playerStatus = item.playerStatus;
    adaptedPlayer.buyoutClause = item.buyoutClause;
    adaptedPlayer.playerTeamId = item.playerTeamId;
    adaptedPlayer.buyoutClauseLockedEndTime = item.buyoutClauseLockedEndTime ? new Date(item.buyoutClauseLockedEndTime) : null;

    return adaptedPlayer;
  }

}
