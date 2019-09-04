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
import {FantasyLoginRoutingModule} from './fantasy-login-routing.module';
import {FantasyLoginComponent} from './fantasy-login.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    FantasyLoginRoutingModule,

    NbAuthModule,
  ],
  declarations: [
    FantasyLoginComponent,
  ],
})
export class FantasyLoginModule { }
