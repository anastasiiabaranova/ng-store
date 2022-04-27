import { Component } from '@angular/core';
import { StoreService } from 'src/shared/services/store.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.less']
})
export class CartComponent {
  constructor(public storeService: StoreService) {
  }
}
