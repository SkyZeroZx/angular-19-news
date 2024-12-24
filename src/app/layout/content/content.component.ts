import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NavBarComponent } from './components/nav-bar';

@Component({
  selector: 'app-content',
  imports: [RouterModule, NavBarComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss',
})
export class ContentComponent {
  routerData = signal<{
    customData: 'Data From Router Outlet';
  }>;
}
