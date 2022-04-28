import { ICartApiService } from '../../interfaces/ICartApiService';
import { CartItem } from '../../models/CartItem';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const host = 'http://localhost:3000/cart-items';

@Injectable()
export class CartApiService implements ICartApiService {

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<CartItem[]> {
    return this.httpClient.get<CartItem[]>(host);
  }

  add(cartItem: CartItem): Observable<void> {
    return this.httpClient.post<void>(host, cartItem);
  }

  edit(cartItem: CartItem): Observable<void> {
    return this.httpClient.put<void>(host, cartItem);
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${host}/${id}`);
  }

}
