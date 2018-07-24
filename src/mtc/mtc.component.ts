import { Router } from '@angular/router';
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

import { anim } from './shared/transition';

@Component({
  selector: 'mtc-root',
  templateUrl: './mtc.component.html',
  styleUrls: ['./mtc.component.scss'],
  animations: [anim]
})
export class MtcComponent implements OnInit {
  @ViewChild('content') content: ElementRef;
  public isArrowVisible = false;
  public isBarHidden = true;

  constructor(
    public router: Router
  ) {}

  ngOnInit(): void {
    (this.content.nativeElement as Element).addEventListener('scroll', () => {
      const number = this.content.nativeElement.scrollTop;
      if (number >= 50) {
        this.isBarHidden = false;
        this.isArrowVisible = true;
      } else if (number < 50) {
        this.isBarHidden = true;
        this.isArrowVisible = false;
      }
    });
  }

  getRouteAnimation(outlet) {
    return outlet.activatedRouteData.state;
  }

  scrollTop() {
    (this.content.nativeElement as Element).children[0].children[1].scrollIntoView({block: 'start', behavior: 'smooth'});
  }
}
