import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PositionComponent } from './position.component';
import { TuiButtonModule, TuiHintModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiBadgeModule, TuiInputModule, TuiInputNumberModule } from '@taiga-ui/kit';
import { PricePipeModule } from '../price-pipe/price-pipe.module';



@NgModule({
  declarations: [
    PositionComponent
  ],
  imports: [
    CommonModule,
    TuiHintModule,
    ReactiveFormsModule,
    FormsModule,
    TuiInputModule,
    TuiInputNumberModule,
    TuiBadgeModule,
    TuiTextfieldControllerModule,
    TuiButtonModule,
    PricePipeModule
  ],
  exports: [
    PositionComponent
  ]
})
export class PositionModule { }
