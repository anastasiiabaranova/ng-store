import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { debounceTime, filter, switchMap, takeUntil } from 'rxjs/operators';
import { CartItem } from 'src/shared/models/CartItem';
import { CartService } from 'src/shared/services/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.less']
})
export class CartItemComponent implements OnInit, OnDestroy {
  @Input()
  cartItem!: CartItem;

  form = this.fb.group({
    amount: [null, [Validators.required, Validators.min(0)]]
  });

  readonly destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    public cartService: CartService
  ) { }

  ngOnInit(): void {
    const amount = this.form.get('amount')!;

    amount.setValue(this.cartItem.amount);

    amount.valueChanges.pipe(
      takeUntil(this.destroy$),
      filter(value => value !== null),
      debounceTime(200),
      switchMap(value =>
        this.updateCartItemAmount(value)
      )
    ).subscribe(() => {});
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  updateCartItemAmount(amount: number): Observable<void> {
    const result = Object.assign(
      { ...this.cartItem },
      { amount }
    );

    return this.cartService.editCartItem(result);
  }

  removeItemFromCart(): void {
    this.cartService.deleteFromCart(this.cartItem.id);
  }

}
