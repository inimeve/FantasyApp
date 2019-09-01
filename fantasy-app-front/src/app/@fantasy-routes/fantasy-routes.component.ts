import { Component } from '@angular/core';

@Component({
  selector: 'ngx-fantasy-routes',
  template: `
    <nb-layout>
      <nb-layout-header>
        <strong>FANTASY ROUTES</strong>
      </nb-layout-header>
      <nb-layout-column>
<!--        <ng-content select="router-outlet"></ng-content>-->
        <router-outlet></router-outlet>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class FantasyRoutesComponent {
}
