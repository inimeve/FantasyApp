import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FantasyUser, FantasyUserAdapter} from './fantasy-user.model';
import {FantasyPlayer} from './fantasy-players';
import {NbAuthJWTToken, NbAuthService} from '@nebular/auth';

@Injectable()
export class FantasyPlayersApi {

  private readonly apiUrl: string = 'http://localhost:4200/api/';

  private readonly resourcePath: string = 'fantasy';

  token: any;

  constructor(private http: HttpClient, private fantasyUserAdapter: FantasyUserAdapter, private authService: NbAuthService) {
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {
          this.token = token.getPayload();
        }
      });
  }

  getAll(): Observable<FantasyPlayer[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.token ? this.token.access_token : '',
      }),
    };

    return this.http.get(this.apiUrl + '/players/all/league/01174211', httpOptions)
      .pipe(map((data: FantasyPlayer[]) => {
        return data;
      }));
  }

  getRankingLeague(): Observable<FantasyUser[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.token ? this.token.access_token : '',
      }),
    };

    return this.http.get(this.apiUrl + '/team/01174211', httpOptions)
      .pipe(map((data: any[]) => {
        return data.map(item => this.fantasyUserAdapter.adapt(item));
      }));
  }

}
