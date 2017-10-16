import { HomeService } from './home.service';
import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { MainBarService } from '../shared/main-bar/main-bar.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
})

export class HomeComponent implements OnInit {
  isArrowHidden = true;
  fragment: string;

  constructor(
    private route: ActivatedRoute,
    private mainBarService: MainBarService,
    private elRef: ElementRef,
    public homeService: HomeService
  ) { }

  ngOnInit() {
    this.mainBarService.modifyIsHidden(true);
    this.route.fragment.subscribe(
      (fragment: string) => {
        this.fragment = fragment;
      }
    );
    this.homeService.getEvent().subscribe(
      () => {
        this.onAnchorClick();
      }
    )
  }

  @HostListener('scroll', ['$event'])
  onScroll(event) {
    const number = this.elRef.nativeElement.scrollTop;
    if (number >= 50) {
      this.mainBarService.modifyIsHidden(false);
      this.isArrowHidden = false;
    } else if (number < 50) {
      this.mainBarService.modifyIsHidden(true);
      this.isArrowHidden = true;
    }
  }

  onAnchorClick() {
    setTimeout(() =>
      document.querySelector('#' + this.fragment).scrollIntoView({block: 'start', behavior: 'smooth'})
    );
  }

  scrollTop() {
    document.getElementById('home-slider').scrollIntoView({block: 'start', behavior: 'smooth'});
  }
}
