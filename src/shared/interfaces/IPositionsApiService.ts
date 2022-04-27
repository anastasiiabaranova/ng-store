import {Observable} from 'rxjs';
import {InjectionToken} from '@angular/core';
import {Position} from '../models/Position';

export const IPositionsApiServiceToken = new InjectionToken('IPositionsApiServiceToken');

export interface IPositionsApiService {
  getAll(): Observable<Position[]>;
}
