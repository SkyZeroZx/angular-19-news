import { Route } from '@angular/router';

import { ProductResolver } from './core/resolvers';
import { ContentComponent } from './layout/content/content.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: ContentComponent,
    children: [
      {
        path: 'products',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./pages/list-product/list-product.component'),
          },
          {
            path: ':id',
            resolve: { product: ProductResolver },
            loadComponent: () =>
              import('./pages/detail-product/detail-product.component'),
          },
        ],
      },
      {
        path: 'check-out',
        loadComponent: () => import('./pages/check-out/check-out.component'),
      },
      {
        path: 'router-context',
        loadComponent: () =>
          import('./pages/router-context/router-context.component'),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/products',
  },
];
