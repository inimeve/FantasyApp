import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FantasyPagesComponent } from './fantasy-pages.component';
import { FantasyDashboardComponent } from './fantasy-dashboard/fantasy-dashboard.component';
import {AuthGuard} from '../@fantasy/auth/route-guards/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: FantasyPagesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: FantasyDashboardComponent,
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FantasyPagesRoutingModule { }
