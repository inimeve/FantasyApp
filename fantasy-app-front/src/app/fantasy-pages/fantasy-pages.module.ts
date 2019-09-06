import { NgModule } from '@angular/core';
import { ThemeModule } from '../@theme/theme.module';

import { FantasyPagesRoutingModule } from './fantasy-pages-routing.module';
import { FantasyPagesComponent } from './fantasy-pages.component';
import { FantasyDashboardModule } from './fantasy-dashboard/fantasy-dashboard.module';
import { NbMenuModule } from '@nebular/theme';

@NgModule({
  imports: [
    FantasyPagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    FantasyDashboardModule,
  ],
  declarations: [
    FantasyPagesComponent,
  ],
})
export class FantasyPagesModule { }
