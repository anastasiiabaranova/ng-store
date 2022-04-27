import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, filter, startWith, switchMap } from 'rxjs/operators';
import { Country } from 'src/shared/models/Country';
import { ExchangeRate } from 'src/shared/models/ExchangeRate';
import { StoreService } from 'src/shared/services/store.service';

function isInvalid(input: AbstractControl | null): boolean {
  return input !== null && input.invalid && input.touched;
}

class CountryComboboxItem {
  constructor(readonly country: Country) { }

  toString(): string {
    return this.country.name;
  }
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

  items: CountryComboboxItem[] = [];

  readonly exchangeRateSearch$ = new Subject<Country>();

  readonly rate$: Observable<ExchangeRate | null> = this.exchangeRateSearch$.pipe(
    filter(country => country !== null),
    switchMap(country =>
      this.requestExchangeRates(country.currency).pipe(
        debounceTime(500)
      )
    )
  );

  readonly matcher = (country: CountryComboboxItem, search: string) =>
    country.toString().toLowerCase().includes(search.toLowerCase());

  constructor(
    private fb: FormBuilder,
    private storeService: StoreService
  ) { }

  ngOnInit(): void {
    this.items = this.storeService.countries.map(
      c => new CountryComboboxItem(c)
    );

    this.form.get('country')?.valueChanges.subscribe((value) => {
      if (value?.country) {
        this.exchangeRateSearch$.next(value.country);
      }
    });

    this.rate$.subscribe(value => {
      this.exchangeRate = value!
    });
  }

  get formattedTotal(): string {
    return `${(this.storeService.total * this.exchangeRate.rate).toFixed(2)
      } ${this.exchangeRate.currency}`;
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
    return this.storeService.getExchangeRate(to);
  }

}
