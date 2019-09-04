import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FantasyPlayersApi} from './fantasy-players/fantasy-players.api';
import {FantasyPlayerData} from './fantasy-players/fantasy-players';
import {FantasyPlayerService} from './fantasy-players/fantasy-players.service';
import {FantasyTokenService} from '../auth/fantasy-token.service';
import {TokenActivate} from '../auth/token-activate/token-activate';

const API = [FantasyPlayersApi];

const SERVICES = [
  { provide: FantasyPlayerData, useClass: FantasyPlayerService },
  { provide: FantasyTokenService, useClass: FantasyTokenService },
  TokenActivate,
];

@NgModule({
  imports: [CommonModule],
})
export class FantasyBackendModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: FantasyBackendModule,
      providers: [
        ...API,
        ...SERVICES,
      ],
    };
  }
}
