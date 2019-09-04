import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FantasyPlayersApi} from './api/fantasy-players/fantasy-players.api';
import {FantasyPlayerData} from './api/fantasy-players/fantasy-players';
import {FantasyPlayerService} from './api/fantasy-players/fantasy-players.service';
import {FantasyTokenService} from './auth/fantasy-token.service';
import {FantasyStuffComponent} from './components/fantasy-stuff/fantasy-stuff.component';

const NB_MODULES = [
];
const COMPONENTS = [
  FantasyStuffComponent,
];
const PIPES = [
];
const API = [
  FantasyPlayersApi,
];
const SERVICES = [
  { provide: FantasyPlayerData, useClass: FantasyPlayerService },
  { provide: FantasyTokenService, useClass: FantasyTokenService },
];


@NgModule({
  imports: [CommonModule, ...NB_MODULES],
  exports: [CommonModule, ...PIPES, ...COMPONENTS],
  declarations: [...COMPONENTS, ...PIPES],
})
export class FantasyModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: FantasyModule,
      providers: [
        ...API,
        ...SERVICES,
      ],
    };
  }
}
