import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FantasyPlayerData} from '../../../@fantasy/api/fantasy-players/fantasy-players';
import {FantasyTokenService} from '../../../@fantasy/auth/fantasy-token.service';

@Component({
  selector: 'ngx-my-sub-page',
  templateUrl: './my-sub-page.component.html',
  styleUrls: ['./my-sub-page.component.scss'],
})
export class MySubPageComponent implements OnInit {

  settings = {
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    columns: {
      id: {
        title: 'ID',
      },
      nickname: {
        title: 'Name',
      },
      positionId: {
        title: 'Position',
      },
      playerStatus: {
        title: 'Status',
      },
      points: {
        title: 'Points',
      },
    },
  };


  data = [];

  rankingData: [];

  rankingTableSettings = {
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    columns: {
      id: {
        title: 'ID',
      },
      name: {
        title: 'Name',
      },
      position: {
        title: 'Position',
      },
      points: {
        title: 'Points',
      },
      teamPoints: {
        title: 'Team Points',
      },
      teamValue: {
        title: 'Team Value',
      },
    },
  };

  tokenInput: string;

  constructor(private fantasyPlayersService: FantasyPlayerData, private fantasyTokenService: FantasyTokenService) { }

  ngOnInit() {
    const token: string = this.fantasyTokenService.getToken();
    if (token) {
      this.tokenInput = this.fantasyTokenService.getToken();
      this.setData();
    }
  }

  public setTokenInLocalStorage() {
    this.fantasyTokenService.setToken(this.tokenInput);

    this.setData();
  }

  public setData() {
    this.fantasyPlayersService.getAll()
      .subscribe((data) => {
        console.log(data);
        this.data = data;
      });
    this.fantasyPlayersService.getRankingLeague()
      .subscribe(data => {
        console.log(data);
        this.rankingData = data;
      });
  }

}
