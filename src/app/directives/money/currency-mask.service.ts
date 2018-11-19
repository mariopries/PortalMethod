import { Injectable } from '@angular/core';

@Injectable()
export class CurrencyMaskService {
  private prefix: string;
  private decimalSeparator: string;
  private thousandsSeparator: string;
  private decimalPrecision: number;
  constructor() {
    this.prefix = 'R$ ';
    this.decimalSeparator = ',';
    this.thousandsSeparator = '.';
    this.decimalPrecision = 2;
  }

  transform(value: string, allowNegative = false, hasPrefix = false) {
    if ( !value ) {
      return null;
    }
    if (allowNegative) {
      value = value.toString();
      if (value.startsWith('(') || value.startsWith('-')) {
        value = '-' + value.substr(1, value.length).replace(/\(|\)|\$|\-/g, '');
      } else {
        value = value.replace(/\(|\)|\$|\-/g, '');
      }
    }
    let [integer, fraction = ''] = (value).toString().split('.');
    fraction = this.decimalPrecision > 0 ? this.decimalSeparator + (fraction + '000000').substring(0, this.decimalPrecision) : '';
    integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, this.thousandsSeparator);
    if (integer === '') {
      integer = '0';
    } else if (integer.startsWith(this.prefix)) {
      integer = integer.substr(3, integer.length);
    } else if (allowNegative && integer.startsWith('-')) {
      integer = integer.substr(1, integer.length);
      if (hasPrefix) {
        return '(' + this.prefix + integer + fraction + ')';
      }
      return '(' + integer + fraction + ')';
    }
    if (hasPrefix) {
      return this.prefix + integer + fraction;
    }
    return integer + fraction;
  }

  parse(value: string, allowNegative = false, hasPrefix = false) {
    let [integer, fraction = ''] = (value || '').split(this.decimalSeparator);
    integer = integer.replace("R$ ", "");
    integer = integer.replace(new RegExp(/\./, 'g'), '');
    fraction = parseInt(fraction, 10) > 0 && this.decimalPrecision > 0 ? '.' + (fraction + '000000').substring(0, this.decimalPrecision) : '';
    if (allowNegative && value.startsWith('(') && value.endsWith(')')) {
      return (-1 * parseFloat(integer + fraction)).toString();
    } else {
      return integer + fraction;
    }
  }

  format(value: string, allowNegative = false) {
    if ( !value ) {
      return null;
    }
    if (allowNegative) {
      value = value.toString();
      if (value.startsWith('(') || value.startsWith('-')) {
        value = '-' + value.substr(1, value.length).replace(/\(|\)|\$|\-/g, '');
      } else {
        value = value.replace(/\(|\)|\$|\-/g, '');
      }
    }
    let [integer, fraction = ''] = (value).toString().split('.');
    fraction = this.decimalPrecision > 0 ? this.decimalSeparator + (fraction + '000000').substring(0, this.decimalPrecision) : '';
    integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, this.thousandsSeparator);
    if (integer === '') {
      integer = '0';
    } else if (integer.startsWith(this.prefix)) {
      integer = integer.substr(3, integer.length);
    } else if (allowNegative && integer.startsWith('-')) {
      integer = integer.substr(1, integer.length);
      return `(<p style="text-align:left;">${this.prefix}<span style="float:right;">${integer + fraction}</span></p>)`;
    }
    return `<p style="text-align:left;">${this.prefix}<span style="float:right;">${integer + fraction}</span></p>`;
  }
}
