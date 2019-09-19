import { Injectable } from '@angular/core';

import {FantasyPlayersApi} from './fantasy-players.api';
import {Observable} from 'rxjs';
import { FantasyPlayer } from './fantasy-player.model';

@Injectable()
export class FantasyPlayerService {

  constructor(private playersApi: FantasyPlayersApi) {}

  getAll(): Observable<FantasyPlayer[]> {
    return this.playersApi.getAll();
  }

}
