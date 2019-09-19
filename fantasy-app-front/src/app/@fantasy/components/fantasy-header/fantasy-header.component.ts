import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NbAuthOAuth2JWTToken, NbAuthService } from '@nebular/auth';
import {FantasyManagerService} from '../../api/fantasy-manager/fantasy-manager.service';
import {FantasyManager} from '../../api/fantasy-manager/fantasy-manager.model';

@Component({
  selector: 'ngx-fantasy-header',
  styleUrls: ['./fantasy-header.component.scss'],
  templateUrl: './fantasy-header.component.html',
})
export class FantasyHeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;

  fantasyManager: FantasyManager;

  userMenu = [ { title: 'Profile' }, { title: 'Log out' } ];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private userService: UserData,
              private layoutService: LayoutService,
              private breakpointService: NbMediaBreakpointsService,
              private authService: NbAuthService,
              private fantasyManagerService: FantasyManagerService) {
  }

  ngOnInit() {
    this.configBreakpoints();

    this.fantasyManagerService.getCurrentManager()
      .subscribe((fantasyManager: FantasyManager) => this.fantasyManager = fantasyManager);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  private configBreakpoints(): void {
    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);
  }

}
