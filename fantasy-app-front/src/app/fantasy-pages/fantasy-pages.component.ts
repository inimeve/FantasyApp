import { Component } from '@angular/core';
import { MENU_ITEMS } from './fantasy-pages-menu';

@Component({
  selector: 'ngx-fantasy-pages',
  styleUrls: ['./fantasy-pages.component.scss'],
  template: `
      <ngx-one-column-layout>
          <nb-menu [items]="menu"></nb-menu>
          <router-outlet></router-outlet>
      </ngx-one-column-layout>
  `,
})
export class FantasyPagesComponent {
  menu = MENU_ITEMS;
}
