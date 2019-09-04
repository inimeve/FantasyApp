import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {MySubPageComponent} from './my-sub-page/my-sub-page.component';
import {MyPageComponent} from './my-page.component';
import {TokenActivate} from '../../@fantasy/auth/token-activate/token-activate';

const routes: Routes = [{
  path: '',
  component: MyPageComponent,
  children: [
    {
      path: 'my-sub-page',
      component: MySubPageComponent,
      // canActivate: [TokenActivate],
    },
    {
      path: '',
      redirectTo: 'my-sub-page',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyPageRoutingModule { }

export const routedComponents = [
  MyPageComponent,
  MySubPageComponent,
];
