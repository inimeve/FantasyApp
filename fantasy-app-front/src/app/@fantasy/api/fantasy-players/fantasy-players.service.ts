import { Injectable } from '@angular/core';

import {FantasyPlayersApi} from './fantasy-players.api';
import {Observable} from 'rxjs';
import { FantasyPlayer } from './fantasy-player.model';
import { FantasyLeague } from '../fantasy-manager/fantasy-manager.model';
import { FantasyStateService } from '../../state/fantasy-state.service';

@Injectable()
export class FantasyPlayerService {

  constructor(private playersApi: FantasyPlayersApi, private fantasyStateService: FantasyStateService) {}

  getAll(): Observable<FantasyPlayer[]> {
    // const league: FantasyLeague = JSON.parse(localStorage.getItem('league'));
    const leagueId: string = this.fantasyStateService.getSelectedLeagueId();

    return this.playersApi.getAll(leagueId);
  }

}
