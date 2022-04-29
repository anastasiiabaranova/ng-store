import { Component } from '@angular/core';
import { CartService } from 'src/shared/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.less']
})
export class CartComponent {
  constructor(public cartService: CartService) {
  }
}
