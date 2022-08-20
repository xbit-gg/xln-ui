import { Pipe, PipeTransform } from '@angular/core';
import {formatCurrency} from "@angular/common";

@Pipe({
  name: 'sat'
})
export class SatPipe implements PipeTransform {

  transform(value: string, includeMsat: boolean): string {
    const sats = value.length > 3 ?
      parseInt(value.substring(0, value.length - 3)).toLocaleString()
      : "0";
    const msats = value.substring(value.length - 3, value.length).padStart(3, "0");
    return sats + (includeMsat ? '.' + msats : '');
  }

}
