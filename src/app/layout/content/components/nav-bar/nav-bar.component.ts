import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterModule } from '@angular/router';
import { ShopCartService } from '../../../../services/shop-cart';

@Component({
  selector: 'app-nav-bar',
  imports: [MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent {
  private readonly shoppingCartState = inject(ShopCartService).state;

  readonly counter = computed(() => this.shoppingCartState()?.length || 0);
}
