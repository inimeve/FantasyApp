import { ValueFormatterParams, ValueGetterParams } from 'ag-grid-community';

export class TableUtils {

  static NAME: string = 'tableUtils';

  private $inject: string[] = [];

  constructor() {}

  public static typeNumber = (params: ValueGetterParams) => {
    return parseInt(params.data[params.colDef.field], 2);
  }

  public static currencyFormatter = (params: ValueFormatterParams) => {
    const formatter = new Intl.NumberFormat('ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
    });

    return params.value ? formatter.format(params.value) : null;
  }

  public static dateFormatter = (params: ValueFormatterParams) => {
    const formatter = new Intl.DateTimeFormat('ES');

    return params.value ? formatter.format(params.value) : null;
  }

  public static numberFormatter = (params: ValueFormatterParams) => {
    const formatter = new Intl.NumberFormat('ES', {
      style: 'decimal',
      maximumFractionDigits: 0,
    });

    return formatter.format(params.value);
  }

  public static decimalNumberFormatter = (params: ValueFormatterParams) => {
    const formatter = new Intl.NumberFormat('ES', {
      style: 'decimal',
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    });

    return formatter.format(params.value);
  }

}
