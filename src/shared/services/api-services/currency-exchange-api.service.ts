import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { ExchangeRate } from '../../models/ExchangeRate';

const url = 'http://api.exchangeratesapi.io/v1/latest?access_key=33048bd03c0c46a06b3d633f83eaf15d';

@Injectable({
  providedIn: 'root'
})
export class CurrencyExchangeApiService {
  getExchangeRate(to: string): Observable<ExchangeRate> {
    return from(
      fetch(`${url}&symbols=${to}`)
      .then(response => response.json())
      .then(response => {
        const targetRate = response['rates'][to];

        return {
          rate: targetRate,
          currency: to
        };
      })
    )
  }
}
