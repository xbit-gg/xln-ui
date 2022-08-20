import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bitcoin'
})
export class BitcoinPipe implements PipeTransform {

  transform(value: string): string {
    if (value.length < 3) {
      return '0.00000000'
    }
    let sats = value.substring(0, value.length - 3)
    if (sats.length < 8) {
      const len = sats.length
      for (let i = 0; i < 8 - len; i++) sats = '0' + sats;
    }
    const bitcoin = sats.length > 8 ? sats.substring(0, sats.length - 8) : '0';
    const remainder = sats.substring(sats.length - 8, sats.length);
    return bitcoin + '.' + remainder;
  }

}
