import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {FantasyTokenService} from '../../fantasy-token.service';

@Injectable()
export class TokenActivate implements CanActivate {

  constructor(private fantasyTokenService: FantasyTokenService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    if (!this.fantasyTokenService.getToken()) {
      this.router.navigate(['auth', 'login']);
    }

    return true;
  }
}
