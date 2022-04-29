import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PositionsListComponent } from './positions-list.component';
import { PositionModule } from '../position/position.module';



@NgModule({
  declarations: [
    PositionsListComponent
  ],
  imports: [
    CommonModule,
    PositionModule
  ],
  exports: [
    PositionsListComponent
  ]
})
export class PositionsListModule { }
