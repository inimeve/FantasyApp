import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {AuthGuard} from './@fantasy/auth/route-guards/auth-guard.service';

const routes: Routes = [
  {
    path: 'pages',
    // canActivate: [AuthGuard],
    loadChildren: () => import('app/pages/pages.module')
      .then(m => m.PagesModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('app/@fantasy/auth/fantasy-auth.module')
      .then(m => m.FantasyAuthModule),
  },
  {
    path: 'fantasy-pages',
    loadChildren: () => import('app/fantasy-pages/fantasy-pages.module')
      .then(m => m.FantasyPagesModule),
  },
  { path: '', redirectTo: 'fantasy-pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'fantasy-pages' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
