import { SocialService } from '../social/social.service';
import { MenuItemService } from '../menu-item/menu-item.service';
import { PanelService } from '../panel/panel.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'main-bar',
  templateUrl: 'main-bar.component.html',
  styleUrls: ['main-bar.component.scss']
})

export class MainBarComponent implements OnInit {
  @Input() isBarHidden = true;
  isPanelHidden = true;

  constructor(
    private panelService: PanelService,
    public menuItemService: MenuItemService,
    public socialService: SocialService
  ) { }

  ngOnInit(): void {
    this.panelService.getIsHidden().subscribe((isHidden) => this.isPanelHidden = isHidden);
  }

  onClickBurger() {
    this.panelService.modifyIsHidden(!this.isPanelHidden);
  }
}
