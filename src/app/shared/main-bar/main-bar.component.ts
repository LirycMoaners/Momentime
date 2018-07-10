import { SocialService } from '../social/social.service';
import { MenuItemService } from '../menu-item/menu-item.service';
import { PanelService } from '../panel/panel.service';
import { Component, OnInit } from '@angular/core';
import { MainBarService } from './main-bar.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'main-bar',
  templateUrl: 'main-bar.component.html',
  styleUrls: ['main-bar.component.scss']
})

export class MainBarComponent implements OnInit {
  isBarHidden = true;
  isPanelHidden = true;
  fragment: string;

  constructor(
    private route: ActivatedRoute,
    private mainBarService: MainBarService,
    private panelService: PanelService,
    public menuItemService: MenuItemService,
    public socialService: SocialService
  ) { }

  ngOnInit() {
    this.mainBarService.getIsHidden().subscribe((isBarHidden: boolean) => this.isBarHidden = isBarHidden);
    this.route.fragment.subscribe(
      (fragment: string) => {
        this.fragment = fragment;
      }
    );
  }

  onClickBurger() {
    this.isPanelHidden = !this.isPanelHidden;
    this.panelService.modifyIsHidden(this.isPanelHidden);
  }

  onAnchorClick() {
    setTimeout(() =>
      document.querySelector('#' + this.fragment).scrollIntoView({block: 'center', behavior: 'smooth'})
    );
  }
}
