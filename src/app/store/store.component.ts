import { Component } from '@angular/core';
import { CartItem } from 'src/shared/models/CartItem';
import { Position } from 'src/shared/models/Position';
import { StoreService } from 'src/shared/services/store.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.less']
})
export class StoreComponent {
  activeTabIndex: number = 0;

  constructor(public storeService: StoreService) {
  }

  ngOnInit(): void {
    this.storeService.initialize();
  }

}
