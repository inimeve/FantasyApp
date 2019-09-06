import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FantasyPlayersApi} from './fantasy-players/fantasy-players.api';
import {FantasyPlayerData} from './fantasy-players/fantasy-players';
import {FantasyPlayerService} from './fantasy-players/fantasy-players.service';

const API = [FantasyPlayersApi];

const SERVICES = [
  { provide: FantasyPlayerData, useClass: FantasyPlayerService },
];

@NgModule({
  imports: [CommonModule],
})
export class FantasyApiModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: FantasyApiModule,
      providers: [
        ...API,
        ...SERVICES,
      ],
    };
  }
}
