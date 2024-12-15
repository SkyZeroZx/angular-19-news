import { map } from 'rxjs';

import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { ProductCard } from '../../core/interfaces';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-detail-product',
  imports: [RouterLink, MatButtonModule, MatCardModule, MatIconModule , CurrencyPipe],
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DetailProductComponent {
  private readonly activatedRoute = inject(ActivatedRoute);

  readonly productDetail: Signal<ProductCard> = toSignal(
    this.activatedRoute.data.pipe(map((data) => data['product']))
  );

  addToCart() {
    console.log('Add  to Card');
  }
}
