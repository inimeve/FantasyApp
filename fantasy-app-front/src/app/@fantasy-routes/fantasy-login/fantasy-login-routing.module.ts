import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {FantasyLoginComponent} from './fantasy-login.component';
import {PruebaComponent} from './prueba/prueba.component';

const routes: Routes = [
  {
    path: '',
    component: FantasyLoginComponent,
    children: [
      {
        path: 'prueba',
        component: PruebaComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FantasyLoginRoutingModule { }
