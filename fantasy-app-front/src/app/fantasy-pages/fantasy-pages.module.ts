import { NgModule } from '@angular/core';
import { ThemeModule } from '../@theme/theme.module';

import { FantasyPagesRoutingModule } from './fantasy-pages-routing.module';
import { FantasyPagesComponent } from './fantasy-pages.component';
import { FantasyDashboardModule } from './fantasy-dashboard/fantasy-dashboard.module';
import { NbMenuModule } from '@nebular/theme';
import {FantasyModule} from '../@fantasy/fantasy.module';

@NgModule({
  imports: [
    FantasyPagesRoutingModule,
    ThemeModule,
    FantasyModule,
    NbMenuModule,
    FantasyDashboardModule,
  ],
  declarations: [
    FantasyPagesComponent,
  ],
})
export class FantasyPagesModule { }
