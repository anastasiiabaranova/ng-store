import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormattedPricePipe } from './formatted-price.pipe';



@NgModule({
  declarations: [
    FormattedPricePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FormattedPricePipe
  ]
})
export class PricePipeModule { }
