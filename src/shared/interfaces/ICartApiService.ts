import { Observable } from 'rxjs';
import { CartItem } from '../models/CartItem';
import { InjectionToken } from '@angular/core';

export const ICartApiServiceToken = new InjectionToken('ICartApiService');

export interface ICartApiService {
  getAll(): Observable<CartItem[]>;

  add(cartItem: CartItem): Observable<CartItem[]>;

  edit(cartItem: CartItem): Observable<void>

  delete(id: number): Observable<void>;
}
