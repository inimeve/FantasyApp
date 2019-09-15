import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';

import { FantasyDashboardComponent } from './fantasy-dashboard.component';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {FantasyModule} from '../../@fantasy/fantasy.module';
import { NbCardModule, NbIconModule } from '@nebular/theme';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  imports: [
    ThemeModule,
    FantasyModule,
    NbCardModule,
    Ng2SmartTableModule,
    NbIconModule,
    AgGridModule.withComponents(),
  ],
  declarations: [
    FantasyDashboardComponent,
  ],
})
export class FantasyDashboardModule { }
