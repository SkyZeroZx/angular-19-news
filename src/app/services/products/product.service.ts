import { map, Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { PaginationAPI, Slider } from '../../core/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProductDummyService {
  private readonly http = inject(HttpClient);

  getProducts(): Observable<Slider[]> {
    return this.http.get<PaginationAPI>('https://dummyjson.com/products').pipe(
      map((res) =>
        res.products.map((product) => ({
          id: product.id,
          image: product.images.at(0) || '',
        }))
      )
    );
  }
}
