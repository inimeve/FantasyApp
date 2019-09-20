import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FantasyPlayersApi} from './fantasy-players/fantasy-players.api';
import {FantasyManagerApi} from './fantasy-manager/fantasy-manager.api';
import {FantasyManagerService} from './fantasy-manager/fantasy-manager.service';
import {FantasyPlayerService} from './fantasy-players/fantasy-players.service';

const API = [
  FantasyPlayersApi,
  FantasyManagerApi,
];

const SERVICES = [
  FantasyPlayerService,
  FantasyManagerService,
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
