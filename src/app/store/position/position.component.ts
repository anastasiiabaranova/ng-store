import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Position } from 'src/shared/models/Position';
import { CartService } from 'src/shared/services/cart.service';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.less']
})
export class PositionComponent {

  @Input() position!: Position;

  form = this.fb.group({
    amount: [1, [
      Validators.required,
      Validators.min(1)
    ]]
  });

  constructor(
    private fb: FormBuilder,
    public cartService: CartService
  ) { }

  addPositionToCart(): void {
    const amount = this.form.get('amount')?.value;
    const result = Object.assign(
      { ...this.position! },
      { amount }
    );

    this.cartService.addToCart(result);
  }
}
