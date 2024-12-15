import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { ProductCard } from '../interfaces';
import { Observable } from 'rxjs';
import { ProductService } from '../../services/products';
import { inject } from '@angular/core';

export const ProductResolver: ResolveFn<ProductCard> = (
  route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot,
  productService: ProductService = inject(ProductService)
): Observable<ProductCard> => {
  const productId = route.paramMap.get('id');
  return productService.findById(productId);
};
