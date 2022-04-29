import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { DeliveryFormModule } from '../delivery-form/delivery-form.module';
import { CartItemModule } from '../cart-item/cart-item.module';
import { PricePipeModule } from '../price-pipe/price-pipe.module';



@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    CartItemModule,
    DeliveryFormModule,
    PricePipeModule
  ],
  exports: [
    CartComponent
  ]
})
export class CartModule { }
