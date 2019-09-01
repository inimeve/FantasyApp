import { NgModule } from '@angular/core';

import {FantasyRoutesRoutingModule} from './fantasy-routes-routing.module';
import {FantasyRoutesComponent} from './fantasy-routes.component';
import {NbLayoutModule} from '@nebular/theme';
import {FantasyLoginModule} from './fantasy-login/fantasy-login.module';

@NgModule({
  imports: [
    FantasyRoutesRoutingModule,
    NbLayoutModule,
  ],
  declarations: [
    FantasyRoutesComponent,
  ],
})
export class FantasyRoutesModule {
}
