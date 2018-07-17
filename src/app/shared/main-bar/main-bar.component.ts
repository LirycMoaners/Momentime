import { SocialService } from '../social/social.service';
import { MenuItemService } from '../menu-item/menu-item.service';
import { PanelService } from '../panel/panel.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'main-bar',
  templateUrl: 'main-bar.component.html',
  styleUrls: ['main-bar.component.scss']
})

export class MainBarComponent {
  @Input() isBarHidden = true;
  isPanelHidden = true;

  constructor(
    private panelService: PanelService,
    public menuItemService: MenuItemService,
    public socialService: SocialService
  ) { }

  onClickBurger() {
    this.isPanelHidden = !this.isPanelHidden;
    this.panelService.modifyIsHidden(this.isPanelHidden);
  }
}
