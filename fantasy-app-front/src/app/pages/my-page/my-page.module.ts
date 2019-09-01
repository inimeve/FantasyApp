import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import {MyPageRoutingModule, routedComponents} from './my-page-routing.module';
import {NbButtonModule, NbCardModule, NbInputModule} from '@nebular/theme';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {FormsModule} from '@angular/forms';
import {FantasyModule} from '../../@fantasy/fantasy.module';

@NgModule({
  imports: [
    Ng2SmartTableModule,
    NbCardModule,
    ThemeModule,
    MyPageRoutingModule,
    NbInputModule,
    NbButtonModule,
    FormsModule,
    FantasyModule,
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class MyPageModule { }
