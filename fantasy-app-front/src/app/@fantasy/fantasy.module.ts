import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FantasyPlayersApi} from './api/fantasy-players/fantasy-players.api';
import {FantasyPlayerService} from './api/fantasy-players/fantasy-players.service';
import {FantasyStuffComponent} from './components/fantasy-stuff/fantasy-stuff.component';
import {AuthGuard} from './auth/route-guards/auth-guard.service';
import {FantasyHeaderComponent} from './components/fantasy-header/fantasy-header.component';
import {
  NbActionsModule,
  NbContextMenuModule,
  NbIconModule, NbLayoutModule,
  NbSearchModule,
  NbSelectModule, NbSidebarModule,
  NbUserModule,
} from '@nebular/theme';
import {NbSecurityModule} from '@nebular/security';
import {
  FantasyOneColumnLayoutComponent,
  FantasyThreeColumnsLayoutComponent,
  FantasyTwoColumnsLayoutComponent,
} from './layouts';
import {FantasyFooterComponent} from './components/fantasy-footer/fantasy-footer.component';

const NB_MODULES = [
  NbIconModule,
  NbSelectModule,
  NbActionsModule,
  NbSearchModule,
  NbUserModule,
  NbContextMenuModule,
  NbSecurityModule,
  NbLayoutModule,
  NbSidebarModule,
];
const COMPONENTS = [
  FantasyStuffComponent,
  FantasyHeaderComponent,
  FantasyFooterComponent,
  FantasyOneColumnLayoutComponent,
  FantasyTwoColumnsLayoutComponent,
  FantasyThreeColumnsLayoutComponent,
];
const PIPES = [
];
const API = [
  FantasyPlayersApi,
];
const SERVICES = [
  { provide: FantasyPlayerService, useClass: FantasyPlayerService },
  { provide: AuthGuard, useClass: AuthGuard},
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
