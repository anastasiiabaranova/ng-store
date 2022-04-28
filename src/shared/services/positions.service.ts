import { Inject, Injectable } from '@angular/core';
import { IPositionsApiService, IPositionsApiServiceToken } from '../interfaces/IPositionsApiService';
import { Position } from '../models/Position';

@Injectable({
  providedIn: 'root'
})
export class PositionsService {
  private _positions: Position[] = [];

  constructor(
    @Inject(IPositionsApiServiceToken)
    private positionsApiService: IPositionsApiService,
  ) { }

  get positions(): Position[] {
    return this._positions;
  }

  initialize() {
    this.positionsApiService.getAll().subscribe(positions => {
      this._positions = positions;
    });
  }
}
