import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';

import { FantasyDashboardComponent } from './fantasy-dashboard.component';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {FantasyModule} from '../../@fantasy/fantasy.module';
import {NbCardModule} from '@nebular/theme';

@NgModule({
  imports: [
    ThemeModule,
    FantasyModule,
    NbCardModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    FantasyDashboardComponent,
  ],
})
export class FantasyDashboardModule { }
