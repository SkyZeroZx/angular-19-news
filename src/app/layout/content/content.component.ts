import { fromEvent, map, tap } from 'rxjs';

import { DOCUMENT } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';

import { CUSTOM_ROUTER_DATA } from '../../core/constants';
import { NavBarComponent } from './components/nav-bar';

@Component({
  selector: 'app-content',
  imports: [RouterModule, NavBarComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss',
})
export class ContentComponent {
  private readonly document = inject(DOCUMENT);

  private readonly customRouterEvent$ = fromEvent<CustomEvent>(
    this.document,
    CUSTOM_ROUTER_DATA
  ).pipe(map(({ detail }) => detail));

  routerData = toSignal(
    this.customRouterEvent$.pipe(tap((res) => console.log(res))),
    {
      initialValue: null,
    }
  );
}
