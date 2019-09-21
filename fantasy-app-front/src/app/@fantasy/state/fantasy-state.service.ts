import { Injectable } from '@angular/core';

export class FantasyAppState {
  selectedLeagueId: string;
}

@Injectable()
export class FantasyStateService {

  private STATE_KEY: string = 'fantasy_app_state';

  private fantasyAppState: FantasyAppState;

  constructor() {
    const oldFantasyAppState: FantasyAppState = this.getFantasyAppState();

    if (oldFantasyAppState) {
      this.setFantasyAppState(oldFantasyAppState);
    } else {
      this.setFantasyAppState(new FantasyAppState());
    }
  }

  public getFantasyAppState(): FantasyAppState {
    return JSON.parse(localStorage.getItem(this.STATE_KEY));
  }

  private setFantasyAppState(fantasyAppState: FantasyAppState): void {
    this.fantasyAppState = fantasyAppState;
    localStorage.setItem(this.STATE_KEY, JSON.stringify(this.fantasyAppState));
  }

  public getSelectedLeagueId(): string {
    return this.fantasyAppState.selectedLeagueId;
  }

  public setSelectedLeagueId(leagueId: string) {
    const fantasyAppState: FantasyAppState = this.getFantasyAppState();
    fantasyAppState.selectedLeagueId = leagueId;

    this.setFantasyAppState(fantasyAppState);
  }

}
