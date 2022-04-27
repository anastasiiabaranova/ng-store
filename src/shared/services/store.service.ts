import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICartApiService, ICartApiServiceToken } from '../interfaces/ICartApiService';
import { IPositionsApiService, IPositionsApiServiceToken } from '../interfaces/IPositionsApiService';
import { CartItem } from '../models/CartItem';
import { Country } from '../models/Country';
import { Position } from '../models/Position';
import { ExchangeRate } from '../models/ExchangeRate';
import { CountriesApiService } from './countries-api.service';
import { CurrencyExchangeApiService } from './currency-exchange-api.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private _positions: Position[] = [];
  private _cart: CartItem[] = [];
  private _total: number = 0;
  private _countries: Country[] = [];

  constructor(
    @Inject(IPositionsApiServiceToken)
    private positionsApiService: IPositionsApiService,
    @Inject(ICartApiServiceToken)
    private cartApiService: ICartApiService,
    private countriesApiService: CountriesApiService,
    private currencyExchangeApiService: CurrencyExchangeApiService
  ) { }

  get positions(): Position[] {
    return this._positions;
  }

  get cart(): CartItem[] {
    return this._cart;
  }

  get total(): number {
    return this._total;
  }

  get countries(): Country[] {
    return this._countries;
  }

  initialize() {
    this.positionsApiService.getAll().subscribe(positions => {
      this._positions = positions;
    });

    this.cartApiService.getAll().subscribe(cart => {
      this._cart = cart;
      this.updateTotal();
    });

    this.countriesApiService.getAll().subscribe(countries => {
      this._countries = countries;
    });
  }

  addToCart(cartItem: CartItem): void {
    this.cartApiService.add(cartItem).subscribe(() => {
      const duplicateIndex = this._cart.findIndex(item => item.id === cartItem.id);
      if (duplicateIndex >= 0) {
        this._cart[duplicateIndex].amount += cartItem.amount;
      } else {
        this._cart.push(cartItem);
      }
      this.updateTotal();
    });
  }

  editCartItem(cartItem: CartItem): Observable<void> {
    const result = this.cartApiService.edit(cartItem);

    result.subscribe(() => {
      const index = this._cart.findIndex(item => item.id === cartItem.id);
      this._cart[index].amount = cartItem.amount;
      this.updateTotal();
    });

    return result
  }

  deleteFromCart(id: number): void {
    this.cartApiService.delete(id).subscribe(() => {
      this._cart = this._cart.filter(item => item.id !== id);
      this.updateTotal();
    });
  }

  updateTotal(): void {
    this._total = this._cart.reduce((total, current) => {
      return total + current.price * current.amount
    }, 0);
  }

  getExchangeRate(to: string): Observable<ExchangeRate> {
    return this.currencyExchangeApiService.getExchangeRate(to);
  }
}
