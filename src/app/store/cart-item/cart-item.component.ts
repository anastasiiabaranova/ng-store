import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, filter, switchMap } from 'rxjs/operators';
import { CartItem } from 'src/shared/models/CartItem';
import { StoreService } from 'src/shared/services/store.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.less']
})
export class CartItemComponent implements OnInit {
  @Input()
  cartItem!: CartItem;

  form = this.fb.group({
    amount: [null, [Validators.required, Validators.min(0)]]
  });

  constructor(
    private fb: FormBuilder,
    public storeService: StoreService
  ) { }

  ngOnInit(): void {
    const amount = this.form.get('amount')!;

    amount.setValue(this.cartItem.amount);

    // Это попытка по примеру с лекции отправлять запросы по мере ввода и отменять
    // старые запросы, когда делается новый. Попытка по ощущениям какая-то кривая...
    amount.valueChanges.pipe(
      filter(value => value !== null),
      debounceTime(200),
      switchMap(value =>
        this.updateCartItemAmount(value)
      )
    ).subscribe(() => {}); // Костыль, потому что без подписчика ничего не работает..
  }

  get formattedPrice(): string {
    return `${this.cartItem.price} €`;
  }

  updateCartItemAmount(amount: number): Observable<void> {
    console.log('here')
    const result = Object.assign(
      { ...this.cartItem },
      { amount }
    );

    return this.storeService.editCartItem(result);
  }

  removeItemFromCart(): void {
    this.storeService.deleteFromCart(this.cartItem.id);
  }

}
