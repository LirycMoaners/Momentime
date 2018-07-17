import { Router } from '@angular/router';
import { Component, ViewChild, ElementRef } from '@angular/core';

import { anim } from './shared/transition';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [anim]
})
export class AppComponent {
  @ViewChild('content') content: ElementRef;

  constructor(
    public router: Router
  ) {}

  getRouteAnimation(outlet) {
    return outlet.activatedRouteData.animation;
  }

  scrollTop() {
    (this.content.nativeElement as Element).children[0].children[1].scrollIntoView({block: 'start', behavior: 'smooth'});
  }
}
