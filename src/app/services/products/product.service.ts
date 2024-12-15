import { map, Observable } from 'rxjs';
import { Cacheable } from 'ts-cacheable';

import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import {
  PaginationOptions,
  PaginationResult,
  Product,
  ProductCard,
  ProductRAW,
} from '../../core/interfaces';
import { createPaginationMetaData, toProductCard } from '../../core/util';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly http = inject(HttpClient);

  @Cacheable()
  getProducts(
    paginationOptions: PaginationOptions
  ): Observable<PaginationResult<ProductCard>> {
    let params = new HttpParams();

    params = params.append('limit', paginationOptions.limit ?? '10');

    params = params.append('skip', paginationOptions.skip ?? '0');

    return this.http
      .get<ProductRAW>(`${environment.API_URL}/products`, { params })
      .pipe(
        map((res) => ({
          data: res.products.map(toProductCard),
          meta: createPaginationMetaData(res.total, res.skip, res.limit),
        }))
      );
  }

  @Cacheable()
  findById(id: number | string): Observable<ProductCard> {
    return this.http
      .get<Product>(`${environment.API_URL}/products/${id}`)
      .pipe(map(toProductCard));
  }
}
