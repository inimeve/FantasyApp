import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { TeamBadgeCellRenderer } from './player-table-cell-renderers/team-badge-cell-renderer';
import { FantasyPlayer } from '../../@fantasy/api/fantasy-players/fantasy-player.model';
import { FantasyPlayerService } from '../../@fantasy/api/fantasy-players/fantasy-players.service';
import { PlayerPositionCellRenderer } from './player-table-cell-renderers/player-position-cell-renderer';
import { PlayerStatusCellRenderer } from './player-table-cell-renderers/player-status-cell-renderer';
import { TableUtils } from './player-table-cell-renderers/table-utils';

@Component({
  selector: 'ngx-fantasy-dashboard',
  styleUrls: ['./fantasy-dashboard.component.scss'],
  templateUrl: './fantasy-dashboard.component.html',
})
export class FantasyDashboardComponent implements OnInit {

  playerColumnDefs: any[] = [
    {
      headerName: '',
      field: 'team.badgeColor',
      cellRenderer: 'teamBadge',
      cellStyle: {display: 'flex', justifyContent: 'center'},
      width: 50,
    },
    {
      headerName: '',
      field: 'positionId',
      width: 50,
      cellRenderer: 'playerPosition',
      cellStyle: {display: 'flex', justifyContent: 'center'},
    },
    {
      headerName: '',
      field: 'playerStatus',
      width: 50,
      cellStyle: {display: 'flex', justifyContent: 'center'},
      cellRenderer: 'playerStatus',
    },
    {headerName: 'Name', field: 'nickname', sortable: true, filter: true, width: 120},
    {
      headerName: 'Points',
      field: 'points',
      sortable: true,
      width: 80,
      cellStyle: {display: 'flex', justifyContent: 'flex-end'},
    },
    {
      headerName: 'Value',
      field: 'marketValue',
      sortable: true,
      filter: true,
      width: 100,
      cellStyle: {display: 'flex', justifyContent: 'flex-end'},
      valueFormatter: TableUtils.currencyFormatter,
    },
    {
      headerName: 'Buyout',
      field: 'buyoutClause',
      sortable: true,
      filter: true,
      width: 100,
      cellStyle: {display: 'flex', justifyContent: 'flex-end'},
      valueFormatter: TableUtils.currencyFormatter,
    },
    {headerName: 'Buyout locked', field: 'buyoutClauseLockedEndTime', sortable: true, width: 100, filter: true, valueFormatter: TableUtils.dateFormatter},
    {headerName: 'PlayerTeam', field: 'playerTeamId', sortable: true, filter: true},
  ];

  gridOptions: GridOptions = {
    columnDefs: this.playerColumnDefs,
    rowData: [],
    components: {
      teamBadge: TeamBadgeCellRenderer,
      playerPosition: PlayerPositionCellRenderer,
      playerStatus: PlayerStatusCellRenderer,
    },
  };

  playerData: FantasyPlayer[] = null;

  constructor(private fantasyPlayersService: FantasyPlayerService) { }

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
