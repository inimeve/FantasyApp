import { Injectable } from '@angular/core';

import {FantasyPlayersApi} from './fantasy-players.api';
import {FantasyPlayerData} from './fantasy-players';

@Injectable()
export class FantasyPlayerService extends FantasyPlayerData {

  constructor(private playersApi: FantasyPlayersApi) {
    super();
  }

  getAll() {
    return this.playersApi.getAll();
  }

  getRankingLeague() {
    return this.playersApi.getRankingLeague();
  }

}
