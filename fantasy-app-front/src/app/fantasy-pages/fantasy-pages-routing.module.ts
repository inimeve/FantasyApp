import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FantasyPagesComponent } from './fantasy-pages.component';
import { FantasyDashboardComponent } from './fantasy-dashboard/fantasy-dashboard.component';

const routes: Routes = [{
  path: '',
  component: FantasyPagesComponent,
  children: [
    {
      path: 'dashboard',
      component: FantasyDashboardComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FantasyPagesRoutingModule { }
