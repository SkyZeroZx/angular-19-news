import { map, Observable } from 'rxjs';

import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import {
  PaginationAPI,
  ProductCard,
  PaginationOptions,
} from '../../core/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly http = inject(HttpClient);

  getProducts(paginationOptions: PaginationOptions): Observable<ProductCard[]> {
    let params = new HttpParams();

    params = params.append('limit', paginationOptions.limit ?? '10');

    params = params.append('skip', paginationOptions.skip ?? '0');

    return this.http
      .get<PaginationAPI>('https://dummyjson.com/products', { params })
      .pipe(
        map((res) =>
          res.products.map((product) => ({
            id: product.id,
            image: product.images.at(0) || '',
            name: product.title,
            description: product.description,
            price: product.price,
          }))
        )
      );
  }
}
