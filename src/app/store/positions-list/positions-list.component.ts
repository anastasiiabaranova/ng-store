import { Component } from '@angular/core';
import { StoreService } from 'src/shared/services/store.service';

@Component({
  selector: 'app-positions-list',
  templateUrl: './positions-list.component.html',
  styleUrls: ['./positions-list.component.less']
})
export class PositionsListComponent {

  constructor(public storeService: StoreService) {
  }

}
