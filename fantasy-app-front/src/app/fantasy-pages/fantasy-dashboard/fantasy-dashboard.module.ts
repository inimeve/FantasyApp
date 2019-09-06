import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';

import { FantasyDashboardComponent } from './fantasy-dashboard.component';

@NgModule({
  imports: [
    ThemeModule,
  ],
  declarations: [
    FantasyDashboardComponent,
  ],
})
export class FantasyDashboardModule { }
