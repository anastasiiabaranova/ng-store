import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Country } from '../models/Country';

@Injectable({
  providedIn: 'root'
})
export class CountriesApiService {
  getAll(): Observable<Country[]> {
    return from(
      fetch(`https://restcountries.com/v3.1/all`)
        .then(result => result.json())
        .then(result => (result as Array<any>).map(
          country => Object.assign(
            { name: country['name'].common },
            country['currencies'] && { currency: Object.keys(country['currencies'])[0] }
          )
        )
      )
    )
  }

}
