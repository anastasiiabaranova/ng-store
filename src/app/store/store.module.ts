import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreComponent } from './store.component';
import { ICartApiServiceToken } from 'src/shared/interfaces/ICartApiService';
import { CartApiService } from 'src/shared/services/cart-api.service';
import { IPositionsApiServiceToken } from 'src/shared/interfaces/IPositionsApiService';
import { PositionsApiService } from 'src/shared/services/positions-api.service';
import { HttpClientModule } from '@angular/common/http';
import { TuiTabsModule } from '@taiga-ui/kit';
import { CartModule } from './cart/cart.module';
import { PositionsListModule } from './positions-list/positions-list.module';


@NgModule({
  declarations: [
    StoreComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    TuiTabsModule,
    PositionsListModule,
    CartModule
  ],
  exports: [
    StoreComponent
  ],
  providers: [
    {provide: ICartApiServiceToken, useClass: CartApiService},
    {provide: IPositionsApiServiceToken, useClass: PositionsApiService}
  ]
})
export class StoreModule { }
