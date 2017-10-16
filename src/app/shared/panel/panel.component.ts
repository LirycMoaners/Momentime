import { HomeService } from '../../home/home.service';
import { SocialService } from '../social/social.service';
import { MenuItemService } from '../menu-item/menu-item.service';
import { Component, ElementRef, OnInit } from '@angular/core';
import { PanelService } from './panel.service';

@Component({
  selector: 'panel',
  templateUrl: 'panel.component.html',
  styleUrls: ['panel.component.scss'],
  host: {
    '(document:click)': 'onClick($event)',
  }
})

export class PanelComponent implements OnInit {
  isPanelHidden = true;
  fragment: string;

  constructor(
    private panelService: PanelService,
    public menuItemService: MenuItemService,
    public socialService: SocialService,
    private eref: ElementRef,
    private homeService: HomeService
  ) { }

  ngOnInit() {
    this.panelService.getIsHidden().subscribe((isPanelHidden: boolean) => this.isPanelHidden = isPanelHidden);
  }

  onAnchorClick() {
    this.homeService.newEvent(null);
  }

  onClick(event) {
    if(!this.eref.nativeElement.contains(event.target) && event.target.className !== "menu-button") {
      this.panelService.modifyIsHidden(true);
    }
  }
}
