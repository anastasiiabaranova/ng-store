import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveryFormComponent } from './delivery-form.component';
import { TuiComboBoxModule, TuiDataListWrapperModule, TuiFilterByInputPipeModule, TuiInputModule, TuiStringifyContentPipeModule } from '@taiga-ui/kit';
import { TuiButtonModule, TuiDataListModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiLetModule } from '@taiga-ui/cdk';
import { PricePipeModule } from '../price-pipe/price-pipe.module';



@NgModule({
  declarations: [
    DeliveryFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TuiComboBoxModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    TuiFilterByInputPipeModule,
    TuiInputModule,
    TuiButtonModule,
    TuiLetModule,
    TuiTextfieldControllerModule,
    PricePipeModule,
    TuiStringifyContentPipeModule
  ],
  exports: [
    DeliveryFormComponent
  ]
})
export class DeliveryFormModule { }
