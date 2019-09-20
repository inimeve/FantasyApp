import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {NbAuthJWTToken, NbAuthService} from '@nebular/auth';
import {FantasyManagerAdapter, FantasyManagerDTO} from './fantasy-manager.model';

@Injectable()
export class FantasyManagerApi {

  private readonly apiUrl: string = 'http://localhost:4200/api/';

  private readonly resourcePath: string = 'manager';

  token: any;

  constructor(private http: HttpClient, private authService: NbAuthService) {
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {
          this.token = token.getPayload();
        }
      });
  }

  getCurrentManager(): Observable<FantasyManagerDTO> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.token ? this.token.access_token : '',
      }),
    };

    return this.http.get(this.apiUrl + this.resourcePath + '/me', httpOptions)
      .pipe(map((item: FantasyManagerDTO) => FantasyManagerAdapter.adapt(item)));
  }

}
