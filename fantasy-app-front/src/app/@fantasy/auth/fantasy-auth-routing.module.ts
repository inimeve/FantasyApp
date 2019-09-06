import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FantasyLoginComponent} from './fantasy-login/fantasy-login.component';
import {NbAuthComponent} from '@nebular/auth';
import {NotFoundComponent} from '../../pages/miscellaneous/not-found/not-found.component';

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
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FantasyAuthRoutingModule {
}
