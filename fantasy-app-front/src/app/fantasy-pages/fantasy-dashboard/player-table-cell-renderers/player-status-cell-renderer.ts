import { ICellRenderer } from 'ag-grid-community';
import { FantasyPlayerStatus } from '../../../@fantasy/api/fantasy-players/fantasy-player.adapter';

export class PlayerStatusCellRenderer implements ICellRenderer {
  public eGui: HTMLElement;
  public eValue: any;

  public init(params) {
    this.eValue = params.value;
    this.eGui = document.createElement('div');
    const innerSpan = document.createElement('span');
    this.eGui.appendChild(innerSpan);

    switch (params.value) {
      case FantasyPlayerStatus.ok:
        this.eGui.className = 'fantasy-player-status fantasy-player-status-ok';
        innerSpan.innerHTML = 'OK';
        break;
      case FantasyPlayerStatus.doubtful:
        this.eGui.className = 'fantasy-player-status fantasy-player-status-doubtful';
        innerSpan.innerHTML = '?';
        break;
      case FantasyPlayerStatus.injured:
        this.eGui.className = 'fantasy-player-status fantasy-player-status-injured';
        innerSpan.innerHTML = '!';
        break;
      case FantasyPlayerStatus.suspended:
        this.eGui.className = 'fantasy-player-status fantasy-player-status-suspended';
        innerSpan.innerHTML = 'x';
        break;
      default:
        break;
    }
  }

  public getGui() {
    return this.eGui;
  }

  public refresh(params): boolean {
    return params.value;
  }
}
