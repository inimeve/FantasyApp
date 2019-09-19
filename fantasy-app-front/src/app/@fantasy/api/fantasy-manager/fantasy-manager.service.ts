import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {FantasyManager} from './fantasy-manager.model';
import {FantasyManagerApi} from './fantasy-manager.api';

@Injectable()
export class FantasyManagerService {

  constructor(private fantasyManagerApi: FantasyManagerApi) {}

  getCurrentManager(): Observable<FantasyManager> {
    return this.fantasyManagerApi.getCurrentManager();
  }

}
