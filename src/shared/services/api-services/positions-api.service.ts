import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPositionsApiService } from '../../interfaces/IPositionsApiService';
import { Position } from '../../models/Position';

const host = 'http://localhost:3000/positions';

@Injectable()
export class PositionsApiService implements IPositionsApiService {
  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<Position[]> {
    return this.httpClient.get<Position[]>(host);
  }
}
