import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ROUTER_OUTLET_DATA } from '@angular/router';

@Component({
  selector: 'app-router-context',
  imports: [JsonPipe],
  templateUrl: './router-context.component.html',
  styleUrl: './router-context.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RouterContextComponent {
  readonly routerContext = inject(ROUTER_OUTLET_DATA);
}
