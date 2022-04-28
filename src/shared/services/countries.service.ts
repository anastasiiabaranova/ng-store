import { Injectable } from '@angular/core';
import { Country } from '../models/Country';
import { CountriesApiService } from './api-services/countries-api.service';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private _countries: Country[] = [];
  
  constructor(
    private countriesApiService: CountriesApiService
  ) { }

  get countries(): Country[] {
    return this._countries;
  }

  initialize() {
    this.countriesApiService.getAll().subscribe(countries => {
      this._countries = countries;
    });
  }
}
