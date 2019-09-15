import { ICellRenderer } from 'ag-grid-community';
import { FantasyPlayerPosition } from '../../../@fantasy/api/fantasy-players/fantasy-player.adapter';

export class PlayerPositionCellRenderer implements ICellRenderer {
  public eGui: HTMLElement;
  public eValue: any;

  public init(params) {
    this.eValue = params.value;
    this.eGui = document.createElement('div');
    const innerSpan = document.createElement('span');
    this.eGui.appendChild(innerSpan);

    switch (params.value) {
      case FantasyPlayerPosition.forward:
        this.eGui.className = 'fantasy-player-position fantasy-player-position-forward';
        innerSpan.innerHTML = 'DL';
        break;
      case FantasyPlayerPosition.midfielder:
        this.eGui.className = 'fantasy-player-position fantasy-player-position-midfielder';
        innerSpan.innerHTML = 'MC';
        break;
      case FantasyPlayerPosition.defense:
        this.eGui.className = 'fantasy-player-position fantasy-player-position-defense';
        innerSpan.innerHTML = 'DF';
        break;
      case FantasyPlayerPosition.goalkepper:
        this.eGui.className = 'fantasy-player-position fantasy-player-position-goalkepper';
        innerSpan.innerHTML = 'PT';
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
