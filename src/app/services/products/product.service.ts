import { map, Observable } from 'rxjs';
import { Cacheable } from 'ts-cacheable';

import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import {
  PaginationAPI,
  PaginationOptions,
  Product,
  ProductCard,
} from '../../core/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly http = inject(HttpClient);

  @Cacheable()
  getProducts(paginationOptions: PaginationOptions): Observable<ProductCard[]> {
    let params = new HttpParams();

    params = params.append('limit', paginationOptions.limit ?? '10');

    params = params.append('skip', paginationOptions.skip ?? '0');

    return this.http
      .get<PaginationAPI>(`${environment.API_URL}/products`, { params })
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

  @Cacheable()
  findById(id: number | string): Observable<ProductCard> {
    return this.http.get<Product>(`${environment.API_URL}/products/${id}`).pipe(
      map((product) => ({
        id: product.id,
        image: product.images.at(0) || '',
        name: product.title,
        description: product.description,
        price: product.price,
      }))
    );
  }
}
