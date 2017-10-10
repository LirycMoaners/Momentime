import { Component } from '@angular/core';

import { anim } from './shared/transition';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [anim]
})
export class AppComponent {

  constructor() {}

  getRouteAnimation(outlet) {
    return outlet.activatedRouteData.animation;
  }
}
