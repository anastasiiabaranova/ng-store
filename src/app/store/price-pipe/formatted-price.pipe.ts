import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formattedPrice'
})
export class FormattedPricePipe implements PipeTransform {

  transform(price: number, currency: string): string {
    return `${Number(price.toFixed(2))} ${currency}`;
  }

}
