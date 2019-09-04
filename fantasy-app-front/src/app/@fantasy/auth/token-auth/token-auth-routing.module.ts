import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TokenAuthComponent } from './token-auth.component';

export const routes: Routes = [
  // .. here goes our components routes
  {
    path: 'prueba',
    component: TokenAuthComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TokenAuthRoutingModule {
}

export const routedComponents = [
  TokenAuthComponent,
];

