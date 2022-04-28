import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/shared/services/cart.service';
import { CountriesService } from 'src/shared/services/countries.service';
import { PositionsService } from 'src/shared/services/positions.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.less']
})
export class StoreComponent implements OnInit {
  activeTabIndex: number = 0;

  constructor(
    private positionsService: PositionsService,
    private cartService: CartService,
    private countriesService: CountriesService
  ) { }

  ngOnInit(): void {
    this.positionsService.initialize();
    this.cartService.initialize();
    this.countriesService.initialize();
  }
}
