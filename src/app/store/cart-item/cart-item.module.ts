import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItemComponent } from './cart-item.component';
import { TuiButtonModule, TuiHintModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiBadgeModule, TuiInputModule, TuiInputNumberModule } from '@taiga-ui/kit';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PricePipeModule } from '../price-pipe/price-pipe.module';



@NgModule({
  declarations: [
    CartItemComponent
  ],
  imports: [
    CommonModule,
    TuiHintModule,
    ReactiveFormsModule,
    FormsModule,
    TuiInputModule,
    TuiBadgeModule,
    TuiInputModule,
    TuiInputNumberModule,
    TuiTextfieldControllerModule,
    TuiButtonModule,
    PricePipeModule
  ],
  exports: [
    CartItemComponent
  ]
})
export class CartItemModule { }
