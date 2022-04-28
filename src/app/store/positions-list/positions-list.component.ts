import { Component } from '@angular/core';
import { PositionsService } from 'src/shared/services/positions.service';

@Component({
  selector: 'app-positions-list',
  templateUrl: './positions-list.component.html',
  styleUrls: ['./positions-list.component.less']
})
export class PositionsListComponent {

  constructor(public positionsService: PositionsService) {
  }

}
