import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { filter, take, tap } from 'rxjs';

import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { rxResource, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { PAGINATION_DEFAULT } from '../../core/constants';
import {
  PaginationOptions,
  PaginationResult,
  ProductCard,
} from '../../core/interfaces';
import { ProductService } from '../../services/products';
import { ScrollEndDirective } from '../../shared/directives/scroll-end';
import { CardProductComponent } from './components/card-product';

@Component({
  selector: 'app-list-product',
  imports: [
    CardProductComponent,
    NgxSkeletonLoaderModule,
    MatButtonModule,
    ScrollEndDirective,
    NgTemplateOutlet,
    MatIconModule,
  ],
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
}) /* allow to write import more clean when lazy load when you add default modificators in class declaration */
export default class ListProductComponent {
  private readonly productService = inject(ProductService);

  pagination = signal<PaginationOptions>(structuredClone(PAGINATION_DEFAULT));

  listProducts = rxResource<
    PaginationResult<ProductCard>,
    { pagination: PaginationOptions }
  >({
    request: () => ({ pagination: this.pagination() }),
    loader: ({ request }) =>
      this.productService.getProducts(request.pagination).pipe(
        tap(({ data }) => {
          this.products.set([...this.products(), ...data]);
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

  metaPagination = computed(() => this.listProducts.value()?.meta);

  endOfList = computed(
    () => !this.metaPagination()?.hasNextPage && !this.listProducts.error()
  );

  onScrollEnd() {
    // to avoid when scrolling cancel request when update signal is emitted
    if (this.listProducts.isLoading() || !this.metaPagination()?.hasNextPage) {
      return;
    }

    this.pagination.update((pagination) => ({
      limit: pagination.limit,
      skip: pagination.skip + pagination.limit,
    }));
  }
}
