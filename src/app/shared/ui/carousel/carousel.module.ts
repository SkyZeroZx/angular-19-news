import { NgModule } from '@angular/core';

import { CarouselComponent } from '../carousel/carousel.component';
import { SwipeModule } from '../swipe/directive/swipe.module';

@NgModule({
  imports: [CarouselComponent, SwipeModule],
  exports: [CarouselComponent],
})
export class CarouselModule {}
