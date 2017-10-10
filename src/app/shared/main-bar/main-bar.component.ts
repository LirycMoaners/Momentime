import { PanelService } from '../panel/panel.service';
import { Component, OnInit } from '@angular/core';
import { MainBarService } from './main-bar.service';

@Component({
  selector: 'main-bar',
  templateUrl: 'main-bar.component.html',
  styleUrls: ['main-bar.component.scss']
})

export class MainBarComponent implements OnInit {
  isBarHidden = true;
  isPanelHidden = true;

  constructor(
    private mainBarService: MainBarService,
    private panelService: PanelService
  ) { }

  ngOnInit() {
    this.mainBarService.getIsHidden().subscribe((isBarHidden: boolean) => this.isBarHidden = isBarHidden);
  }

  onClickBurger() {
    this.isPanelHidden = !this.isPanelHidden;
    this.panelService.modifyIsHidden(this.isPanelHidden);
  }
}
