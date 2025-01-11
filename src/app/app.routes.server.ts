import { inject } from '@angular/core';
import { PrerenderFallback, RenderMode, ServerRoute } from '@angular/ssr';
import { ProductService } from './services/products';
import { firstValueFrom } from 'rxjs';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'check-out',
    renderMode: RenderMode.Client,
  },
  {
    path: 'router-context',
    renderMode: RenderMode.Client,
  },
  // {
  //   path: 'products/:id',
  //   renderMode: RenderMode.Prerender,
  //   async getPrerenderParams() {
  //     const productService = inject(ProductService);
  //     const listProducts = await firstValueFrom(productService.getProducts());
  //     const listPreRender = listProducts.data.map(({ id }) => ({
  //       id: id.toString(),
  //     }));
  //     return listPreRender;
  //   },
  //   fallback: PrerenderFallback.Client,
  // },
  {
    path: '**',
    renderMode: RenderMode.Server,
  },
];
