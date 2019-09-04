import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FantasyLoginComponent} from './fantasy-login/fantasy-login.component';
import {NbAuthComponent} from '@nebular/auth';

export const routes: Routes = [
  {
    path: '',
    component: NbAuthComponent,
    children: [
      {
        path: 'login',
        component: FantasyLoginComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FantasyLoginRoutingModule {
}
