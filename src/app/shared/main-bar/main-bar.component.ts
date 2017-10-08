import { Component, OnInit } from '@angular/core';
import { MainBarService } from './main-bar.service';

@Component({
  selector: 'main-bar',
  templateUrl: 'main-bar.component.html',
  styleUrls: ['main-bar.component.scss']
})

export class MainBarComponent implements OnInit {
  isBarHidden = true;

  constructor(
    private mainBarService: MainBarService
  ) { }

  ngOnInit() {
    this.mainBarService.getIsHidden().subscribe((isBarHidden: boolean) => this.isBarHidden = isBarHidden);
  }
}
