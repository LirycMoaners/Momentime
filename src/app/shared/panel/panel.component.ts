import { SocialService } from '../social/social.service';
import { MenuItemService } from '../menu-item/menu-item.service';
import { Component, OnInit } from '@angular/core';
import { PanelService } from './panel.service';

@Component({
  selector: 'panel',
  templateUrl: 'panel.component.html',
  styleUrls: ['panel.component.scss']
})

export class PanelComponent implements OnInit {
  isPanelHidden = true;
  fragment: string;

  constructor(
    private panelService: PanelService,
    public menuItemService: MenuItemService,
    public socialService: SocialService
  ) { }

  ngOnInit() {
    this.panelService.getIsHidden().subscribe((isPanelHidden: boolean) => this.isPanelHidden = isPanelHidden);
  }

  onAnchorClick() {
    setTimeout(() =>
      document.querySelector('#' + this.fragment).scrollIntoView({block: 'start', behavior: 'smooth'})
    );
  }
}
