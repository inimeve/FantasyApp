import { NgModule } from '@angular/core';

import {FantasyLoginRoutingModule} from './fantasy-login-routing.module';
import {PruebaComponent} from './prueba/prueba.component';
import {FantasyLoginComponent} from './fantasy-login.component';
import {NbLayoutModule} from '@nebular/theme';

const components = [
  PruebaComponent,
  FantasyLoginComponent,
];

@NgModule({
  imports: [
    FantasyLoginRoutingModule,
    NbLayoutModule,
  ],
  declarations: [
    ...components,
  ],
})
export class FantasyLoginModule { }
