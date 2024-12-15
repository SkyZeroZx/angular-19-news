import { Route } from '@angular/router';

import { ProductResolver } from './core/resolvers';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./pages/list-product/list-product.component'),
  },
  {
    path: ':id',
    resolve: { product: ProductResolver },
    loadComponent: () =>
      import('./pages/detail-product/detail-product.component'),
  },
];
