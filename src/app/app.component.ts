import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainBarService } from './shared/main-bar/main-bar.service';
import { anim } from './shared/transition';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [anim]
})
export class AppComponent implements OnInit {
  isBarHidden = true;

  constructor(
    private mainBarService: MainBarService
  ) {}

  ngOnInit(): void {
    this.mainBarService.getIsHidden().subscribe((isBarHidden: boolean) => this.isBarHidden = isBarHidden);
  }

  getRouteAnimation(outlet) {
    return outlet.activatedRouteData.animation;
  }
}
