import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { filter, take, tap } from 'rxjs';

import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { rxResource, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';

import { PAGINATION_DEFAULT } from '../../core/constants';
import { PaginationOptions, ProductCard } from '../../core/interfaces';
import { ProductService } from '../../services/products/product.service';
import { ScrollEndDirective } from '../../shared/directives/scroll-end';
import { CardProductComponent } from './components/card-product/card-product.component';

@Component({
  selector: 'app-list-product',
  imports: [
    CardProductComponent,
    NgxSkeletonLoaderModule,
    MatButtonModule,
    ScrollEndDirective,
    NgTemplateOutlet,
  ],
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
}) /* allow to write import more clean when lazy load when you add default modificators in class declaration */
export default class ListProductComponent {
  private readonly productService = inject(ProductService);

  pagination = signal<PaginationOptions>(structuredClone(PAGINATION_DEFAULT));

  listProducts = rxResource<ProductCard[], { pagination: PaginationOptions }>({
    request: () => ({ pagination: this.pagination() }),
    loader: ({ request }) =>
      this.productService.getProducts(request.pagination).pipe(
        tap((res) => {
          this.products.set([...this.products(), ...res]);
        })
      ),
  });

  readonly loading$ = toObservable(this.listProducts.isLoading);

  firstLoad = toSignal(
    this.loading$.pipe(
      filter((value) => !value),
      take(1)
    )
  );

  products = signal<ProductCard[]>([]);

  onScrollEnd() {
    // to avoid when scrolling cancel request when update signal is emitted
    if (this.listProducts.isLoading()) {
      return;
    }
    this.pagination.update((pagination) => ({
      limit: pagination.limit,
      skip: pagination.skip + 10,
    }));
  }
}
