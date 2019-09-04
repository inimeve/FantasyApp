import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FantasyUser, FantasyUserAdapter} from './fantasy-user.model';
import {FantasyTokenService} from '../../auth/fantasy-token.service';

@Injectable()
export class FantasyPlayersApi {

  private readonly apiUrl: string = 'http://localhost:4200/api/fantasy';

  private readonly resourcePath: string = 'fantasy';

  constructor(private http: HttpClient, private fantasyTokenService: FantasyTokenService, private fantasyUserAdapter: FantasyUserAdapter) {}

  getAll(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.fantasyTokenService.getToken(),
      }),
    };

    // return this.http.get(`http://localhost:4200/api/fantasy/players/01174211`, httpOptions)
    return this.http.get(this.apiUrl + '/players/01174211', httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  getRankingLeague(): Observable<FantasyUser[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.fantasyTokenService.getToken(),
      }),
    };

    // return this.http.get(`http://localhost:4200/api/fantasy/players/01174211`, httpOptions)
    return this.http.get(this.apiUrl + '/ranking/01174211', httpOptions)
      .pipe(map((data: any[]) => {
        return data.map(item => this.fantasyUserAdapter.adapt(item));
      }));
  }

}
