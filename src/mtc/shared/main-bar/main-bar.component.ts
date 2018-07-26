import { AppConfigService } from '../app-config/app-config.service';
import { MenuItemService } from '../menu-item/menu-item.service';
import { PanelService } from '../panel/panel.service';
import { Component, Input, OnInit } from '@angular/core';
import { AppConfig } from '../app-config/app-config.model';
import { MenuItem } from '../menu-item/menu-item.model';

@Component({
  selector: 'mtc-main-bar',
  templateUrl: 'main-bar.component.html',
  styleUrls: ['main-bar.component.scss']
})
export class MainBarComponent implements OnInit {
  @Input() isBarHidden = true;
  isPanelHidden = true;
  public appConfig: AppConfig;
  public menuItemList: MenuItem[];

  constructor(
    public menuItemService: MenuItemService,
    private panelService: PanelService,
    private appConfigService: AppConfigService
  ) { }

  ngOnInit(): void {
    this.panelService.getIsHidden().subscribe((isHidden) => this.isPanelHidden = isHidden);
    this.appConfigService.getAppConfig().subscribe((appConfig: AppConfig) => this.appConfig = appConfig);
    this.menuItemService.getMenuItemList('fr').subscribe((menuItemList: MenuItem[]) => this.menuItemList = menuItemList);
  }

  onClickBurger() {
    this.panelService.modifyIsHidden(!this.isPanelHidden);
  }

  onAnchorClick(fragment: string) {
    setTimeout(() =>
      document.querySelector('#' + fragment).scrollIntoView({block: 'center', behavior: 'smooth'})
    );
  }
}
