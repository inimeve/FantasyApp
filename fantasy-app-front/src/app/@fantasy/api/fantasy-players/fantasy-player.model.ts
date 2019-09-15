export class FantasyPlayer {

  private _id: string;
  private _nickname: string;
  private _points: number;
  private _team: any;
  private _positionId: number;
  private _marketValue: number;
  private _name: string;
  private _averagePoints: number;
  private _lastSeasonPoints: number;
  private _playerStatus: string;
  private _buyoutClause: number;
  private _playerTeamId: string;
  private _buyoutClauseLockedEndTime: Date;

  constructor(id: string, points: number, team: any, positionId: number, name: string) {
    this._id = id;
    this._points = points;
    this._team = team;
    this._positionId = positionId;
    this._name = name;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get nickname(): string {
    return this._nickname;
  }

  set nickname(value: string) {
    this._nickname = value;
  }

  get points(): number {
    return this._points;
  }

  set points(value: number) {
    this._points = value;
  }

  get team(): any {
    return this._team;
  }

  set team(value: any) {
    this._team = value;
  }

  get positionId(): number {
    return this._positionId;
  }

  set positionId(value: number) {
    this._positionId = value;
  }

  get marketValue(): number {
    return this._marketValue;
  }

  set marketValue(value: number) {
    this._marketValue = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get averagePoints(): number {
    return this._averagePoints;
  }

  set averagePoints(value: number) {
    this._averagePoints = value;
  }

  get lastSeasonPoints(): number {
    return this._lastSeasonPoints;
  }

  set lastSeasonPoints(value: number) {
    this._lastSeasonPoints = value;
  }

  get playerStatus(): string {
    return this._playerStatus;
  }

  set playerStatus(value: string) {
    this._playerStatus = value;
  }

  get buyoutClause(): number {
    return this._buyoutClause;
  }

  set buyoutClause(value: number) {
    this._buyoutClause = value;
  }

  get playerTeamId(): string {
    return this._playerTeamId;
  }

  set playerTeamId(value: string) {
    this._playerTeamId = value;
  }

  get buyoutClauseLockedEndTime(): Date {
    return this._buyoutClauseLockedEndTime;
  }

  set buyoutClauseLockedEndTime(value: Date) {
    this._buyoutClauseLockedEndTime = value;
  }
}

