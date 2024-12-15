import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { ProductCard } from '../../../../core/interfaces';

@Component({
  selector: 'app-card-product',
  imports: [MatCardModule, MatButtonModule , NgOptimizedImage],
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardProductComponent {
  product = input.required<ProductCard>();
}
