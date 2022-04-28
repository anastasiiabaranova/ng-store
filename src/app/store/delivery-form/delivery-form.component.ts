import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { debounceTime, filter, switchMap } from 'rxjs/operators';
import { Country } from 'src/shared/models/Country';
import { ExchangeRate } from 'src/shared/models/ExchangeRate';
import { CartService } from 'src/shared/services/cart.service';
import { CountriesService } from 'src/shared/services/countries.service';
import { ExchangeRatesService } from 'src/shared/services/exchange-rates.service';

function isInvalid(input: AbstractControl | null): boolean {
  return input !== null && input.invalid && input.touched;
}

@Component({
  selector: 'app-delivery-form',
  templateUrl: './delivery-form.component.html',
  styleUrls: ['./delivery-form.component.less']
})
export class DeliveryFormComponent implements OnInit {

  form = this.fb.group({
    name: [null, Validators.required],
    country: [null, Validators.required],
    address: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]]
  });

  exchangeRate: ExchangeRate = {
    rate: 1,
    currency: 'EUR'
  };

  countries: Country[] = [];

  readonly exchangeRateSearch$ = new Subject<Country>();

  readonly rate$: Observable<ExchangeRate | null> = this.exchangeRateSearch$.pipe(
    filter(country => country !== null),
    switchMap(country =>
      this.requestExchangeRates(country.currency).pipe(
        debounceTime(500)
      )
    )
  );

  readonly matcher = (country: Country, search: string) =>
    country.name.toLowerCase().includes(search.toLowerCase());
  
  readonly stringify = (country: Country) => country.name;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private countriesService: CountriesService,
    private exchangeRatesService: ExchangeRatesService
  ) { }

  ngOnInit(): void {
    this.countries = this.countriesService.countries;

    this.form.get('country')?.valueChanges.subscribe((value) => {
      if (value?.currency) {
        this.exchangeRateSearch$.next(value);
      }
    });

    this.rate$.subscribe(value => {
      this.exchangeRate = value!
    });
  }

  get totalInCurrency(): number {
    return this.cartService.total * this.exchangeRate.rate;
  }

  get emailError(): string | undefined {
    const input = this.form.get('email');

    if (input?.errors?.['required']) {
      return 'Поле обязательно для заполнения';
    }
    if (input?.errors?.['email']) {
      return 'Некорректный формат электронной почты';
    }
    return undefined;
  }

  getInvalid(inputName: string): boolean {
    return isInvalid(this.form.get(inputName));
  }

  submit(): void {
    this.form.reset();
  }

  requestExchangeRates(to: string): Observable<ExchangeRate> {
    return this.exchangeRatesService.getExchangeRate(to);
  }

}
