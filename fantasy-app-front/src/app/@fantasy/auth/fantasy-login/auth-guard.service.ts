import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {NbAuthService} from '@nebular/auth';
import {tap} from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: NbAuthService, private router: Router) {
  }

  canActivate() {
    const refresh_token: string = localStorage.getItem('refresh_token');

    if (refresh_token) return true;

    this.router.navigate(['/fantasy-login/login']);
    return false;
  }
}
