import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExchangeRate } from '../models/ExchangeRate';
import { CurrencyExchangeApiService } from './api-services/currency-exchange-api.service';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRatesService {

  constructor(
    private currencyExchangeApiService: CurrencyExchangeApiService
  ) { }

  getExchangeRate(to: string): Observable<ExchangeRate> {
    return this.currencyExchangeApiService.getExchangeRate(to);
  }
}
