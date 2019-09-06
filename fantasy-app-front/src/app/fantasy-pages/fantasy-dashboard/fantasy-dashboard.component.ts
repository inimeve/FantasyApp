import {Component, OnInit} from '@angular/core';
import {FantasyPlayerData} from '../../@fantasy/api/fantasy-players/fantasy-players';

@Component({
  selector: 'ngx-fantasy-dashboard',
  styleUrls: ['./fantasy-dashboard.component.scss'],
  templateUrl: './fantasy-dashboard.component.html',
})
export class FantasyDashboardComponent implements OnInit {

  playerDataSettings = {
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    columns: {
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
        compareFunction: (dir, a, b) => parseInt(a, 0) >= parseInt(b, 0) ? dir * 1 : dir * -1,
      },
      marketValue: {
        title: 'Value',
        compareFunction: (dir, a, b) => parseInt(a, 0) >= parseInt(b, 0) ? dir * 1 : dir * -1,
      },
      buyoutClause: {
        title: 'Clause',
        compareFunction: (dir, a, b) => parseInt(a, 0) >= parseInt(b, 0) ? dir * 1 : dir * -1,
      },
      buyoutClauseLockedEndTime: {
        title: 'Clause End Time',
      },
    },
    pager: {
      perPage: 20,
    },
    sort: true,
  };

  playerData = [];

  constructor(private fantasyPlayersService: FantasyPlayerData) { }

  ngOnInit() {
    this.setData();
  }

  public setData() {
    this.fantasyPlayersService.getAll()
      .subscribe((data) => {
        this.playerData = data;
      });
  }

}
