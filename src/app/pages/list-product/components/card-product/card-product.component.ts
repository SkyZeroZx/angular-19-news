import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

import { ProductCard } from '../../../../core/interfaces';
import { ShopCartService } from '../../../../services/shop-cart';

@Component({
  selector: 'app-card-product',
  imports: [MatCardModule, MatButtonModule, NgOptimizedImage, RouterLink],
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardProductComponent {
  private readonly shopCartService = inject(ShopCartService);
  readonly product = input.required<ProductCard>();

  addToCard() {
    this.shopCartService.add({
      ...this.product(),
      quantity: 1,
    });
  }
}
