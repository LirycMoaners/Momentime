import { AppConfigService } from '../app-config/app-config.service';
import { MenuItemService } from '../menu-item/menu-item.service';
import { Component, ElementRef, OnInit, HostListener } from '@angular/core';
import { PanelService } from './panel.service';
import { AppConfig } from '../app-config/app-config.model';
import { MenuItem } from '../menu-item/menu-item.model';

@Component({
  selector: 'mtc-panel',
  templateUrl: 'panel.component.html',
  styleUrls: ['panel.component.scss']
})

export class PanelComponent implements OnInit {
  isPanelHidden = true;
  fragment: string;
  public appConfig: AppConfig;
  public menuItemList: MenuItem[];

  constructor(
    public menuItemService: MenuItemService,
    private panelService: PanelService,
    private appConfigService: AppConfigService,
    private eref: ElementRef
  ) { }

  ngOnInit() {
    this.panelService.getIsHidden().subscribe((isPanelHidden: boolean) => this.isPanelHidden = isPanelHidden);
    this.appConfigService.getAppConfig().subscribe((appConfig: AppConfig) => this.appConfig = appConfig);
    this.menuItemService.getMenuItemList('fr').subscribe((menuItemList: MenuItem[]) => this.menuItemList = menuItemList);
  }

  @HostListener('document:click', ['$event'])
  onClick(event) {
    if (!this.eref.nativeElement.contains(event.target) && event.target.className !== 'menu-button') {
      this.panelService.modifyIsHidden(true);
    }
  }

  onClickItem() {
    this.panelService.modifyIsHidden(true);
  }

  onAnchorClick(fragment: string) {
    this.onClickItem();
    setTimeout(() =>
      document.querySelector('#' + fragment).scrollIntoView({block: 'center', behavior: 'smooth'})
    );
  }
}
