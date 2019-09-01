import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {FantasyRoutesComponent} from './fantasy-routes.component';
import {FantasyLoginComponent} from './fantasy-login/fantasy-login.component';

const routes: Routes = [
  {
    path: '',
    component: FantasyRoutesComponent,
    children: [
      {
        path: 'fantasy-login',
        // component: FantasyLoginComponent,
        loadChildren: () => import('./fantasy-login/fantasy-login.module')
          .then(m => m.FantasyLoginModule),
      },
    ],
  },
  {
    path: '',
    redirectTo: 'fantasy-login/prueba',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FantasyRoutesRoutingModule {
}
