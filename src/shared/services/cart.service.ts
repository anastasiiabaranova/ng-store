import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ICartApiService, ICartApiServiceToken } from '../interfaces/ICartApiService';
import { CartItem } from '../models/CartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _cartItems: CartItem[] = [];
  private _total: number = 0;

  constructor(
    @Inject(ICartApiServiceToken)
    private cartApiService: ICartApiService
  ) { }

  get cartItems(): CartItem[] {
    return this._cartItems;
  }

  get total(): number {
    return this._total;
  }

  initialize() {
    this.cartApiService.getAll().subscribe(cartItems => {
      this._cartItems = cartItems;
      this.updateTotal();
    });
  }

  addToCart(cartItem: CartItem): void {
    this.cartApiService.add(cartItem).subscribe((newCartItems) => {
      this._cartItems = newCartItems;
      this.updateTotal();
    });
  }

  editCartItem(cartItem: CartItem): Observable<void> {
    return this.cartApiService.edit(cartItem).pipe(
      tap(() => {
        const index = this._cartItems.findIndex(item => item.id === cartItem.id);
        this._cartItems[index].amount = cartItem.amount;
        this.updateTotal(); 
      })
    );
  }

  deleteFromCart(id: number): void {
    this.cartApiService.delete(id).subscribe(() => {
      this._cartItems = this._cartItems.filter(item => item.id !== id);
      this.updateTotal();
    });
  }

  updateTotal(): void {
    this._total = this._cartItems.reduce((total, current) => {
      return total + current.price * current.amount
    }, 0);
  }
}
