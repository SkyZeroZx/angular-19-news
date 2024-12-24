import { CurrencyPipe, JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  linkedSignal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ROUTER_OUTLET_DATA } from '@angular/router';
import { CarouselComponent } from '../../shared/ui/carousel/carousel.component';
import { CarouselModule } from '../../shared/ui/carousel/carousel.module';
import { ShopCartService } from '../../services/shop-cart/shop-cart.service';
import { Slide } from '../../shared/ui/carousel/carousel.interface';

@Component({
  selector: 'app-check-out',
  imports: [
    MatCardModule,
    CurrencyPipe,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    CarouselComponent,
    CarouselModule,
  ],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CheckOutComponent {
  readonly stateShopCart = inject(ShopCartService);
  listImages = computed(() =>
    this.stateShopCart.state().map((product) => ({
      ...product,
      src: product.image,
      height: 363,
      width: 363,
    }))
  );

  currentProduct = linkedSignal({
    source: this.stateShopCart.state,
    computation: () => this.stateShopCart.state().at(0),
  });
  // readonly routerData =
  //   inject<Signal<{ customData: string }>>(ROUTER_OUTLET_DATA);

  quantity = linkedSignal({
    source: this.currentProduct,
    computation: () => 1,
  });

  totalPrice = computed(() => this.quantity() * this.currentProduct()?.price);

  increaseQuantity(): void {
    this.quantity.update((current) => current + 1);
  }

  decreaseQuantity(): void {
    this.quantity.update((current) => current - 1);
  }

  onChangeSlide(slide: Slide) {
    const getCurrentProduct = this.stateShopCart
      .state()
      .find((product) => product.id === slide.id);
    this.currentProduct.set(getCurrentProduct);
  }

  placeOrder(): void {
    console.log('Order placed with quantity:', this.quantity());
    console.log('Total price:', this.totalPrice());
  }
}
