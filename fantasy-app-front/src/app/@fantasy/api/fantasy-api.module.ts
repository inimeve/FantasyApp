import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FantasyPlayersApi} from './fantasy-players/fantasy-players.api';
import {FantasyPlayerService} from './fantasy-players/fantasy-players.service';

const API = [FantasyPlayersApi];

const SERVICES = [
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
