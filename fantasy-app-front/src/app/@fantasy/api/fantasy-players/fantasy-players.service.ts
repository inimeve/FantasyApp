import { Injectable } from '@angular/core';

import {FantasyPlayersApi} from './fantasy-players.api';
import {FantasyPlayer, FantasyPlayerData} from './fantasy-players';
import {Observable} from 'rxjs';

@Injectable()
export class FantasyPlayerService extends FantasyPlayerData {

  constructor(private playersApi: FantasyPlayersApi) {
    super();
  }

  getAll(): Observable<FantasyPlayer[]> {
    return this.playersApi.getAll();
  }

  getRankingLeague(): Observable<any> {
    return this.playersApi.getRankingLeague();
  }

}
