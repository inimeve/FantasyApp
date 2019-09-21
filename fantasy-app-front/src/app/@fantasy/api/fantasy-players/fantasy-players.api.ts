import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {map} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {NbAuthJWTToken, NbAuthService} from '@nebular/auth';
import {FantasyPlayer} from './fantasy-player.model';
import {FantasyPlayerAdapter} from './fantasy-player.adapter';

@Injectable()
export class FantasyPlayersApi {

  private readonly apiUrl: string = 'http://localhost:4200/api/';

  private readonly resourcePath: string = 'fantasy';

  token: any;

  constructor(private http: HttpClient, private authService: NbAuthService) {
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {
          this.token = token.getPayload();
        }
      });
  }

  getAll(leagueId: string): Observable<FantasyPlayer[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.token ? this.token.access_token : '',
      }),
    };

    return this.http.get(this.apiUrl + '/players/all/league/' + leagueId, httpOptions)
      .pipe(map((items: FantasyPlayer[]) => {
        return items.map(item => FantasyPlayerAdapter.adapt(item));
      }));
  }

}
