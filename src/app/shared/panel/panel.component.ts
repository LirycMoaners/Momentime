import { Component, OnInit } from '@angular/core';
import { PanelService } from './panel.service';

@Component({
  selector: 'panel',
  templateUrl: 'panel.component.html',
  styleUrls: ['panel.component.scss']
})

export class PanelComponent implements OnInit {
  isPanelHidden = true;

  constructor(
    private panelService: PanelService
  ) { }

  ngOnInit() {
    this.panelService.getIsHidden().subscribe((isPanelHidden: boolean) => this.isPanelHidden = isPanelHidden);
  }
}
