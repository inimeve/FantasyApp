import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NbAuthModule } from '@nebular/auth';
import {
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
  NbInputModule,
} from '@nebular/theme';
import {FantasyAuthRoutingModule} from './fantasy-auth-routing.module';
import {FantasyLoginComponent} from './fantasy-login/fantasy-login.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    FantasyAuthRoutingModule,

    NbAuthModule,
  ],
  declarations: [
    FantasyLoginComponent,
  ],
})
export class FantasyAuthModule { }
