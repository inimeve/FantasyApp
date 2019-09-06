import { Component } from '@angular/core';

@Component({
  selector: 'ngx-fantasy-two-columns-layout',
  styleUrls: ['./fantasy-two-columns.layout.scss'],
  template: `
    <nb-layout windowMode>
      <nb-layout-header fixed>
        <ngx-fantasy-header></ngx-fantasy-header>
      </nb-layout-header>

      <nb-sidebar class="menu-sidebar" tag="menu-sidebar" responsive>
        <ng-content select="nb-menu"></ng-content>
      </nb-sidebar>

      <nb-layout-column class="small">
      </nb-layout-column>

      <nb-layout-column>
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>

      <nb-layout-footer fixed>
        <ngx-fantasy-footer></ngx-fantasy-footer>
      </nb-layout-footer>

    </nb-layout>
  `,
})
export class FantasyTwoColumnsLayoutComponent {}
