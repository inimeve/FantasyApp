import { ICellRenderer, ICellRendererParams } from 'ag-grid-community';

export class TeamBadgeCellRenderer implements ICellRenderer {
  public eGui: HTMLElement;
  public eValue: any;

  public init(params) {
    this.eValue = params.value;

    const imageElement: HTMLImageElement = document.createElement('img');
    imageElement.src = this.eValue;
    imageElement.style.height = '100%';

    this.eGui = imageElement;
  }

  public getGui() {
    return this.eGui;
  }

  public refresh(params): boolean {
    return params.value;
  }
}
