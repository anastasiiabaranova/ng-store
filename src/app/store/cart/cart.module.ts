import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { DeliveryFormModule } from '../delivery-form/delivery-form.module';
import { CartItemModule } from '../cart-item/cart-item.module';



@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    CartItemModule,
    DeliveryFormModule
  ],
  exports: [
    CartComponent
  ]
})
export class CartModule { }
