import { SocialService } from '../social/social.service';
import { MenuItemService } from '../menu-item/menu-item.service';
import { Component, ElementRef, OnInit, HostListener } from '@angular/core';
import { PanelService } from './panel.service';

@Component({
  selector: 'mtc-panel',
  templateUrl: 'panel.component.html',
  styleUrls: ['panel.component.scss']
})

export class PanelComponent implements OnInit {
  isPanelHidden = true;
  fragment: string;

  constructor(
    private panelService: PanelService,
    public menuItemService: MenuItemService,
    public socialService: SocialService,
    private eref: ElementRef
  ) { }

  ngOnInit() {
    this.panelService.getIsHidden().subscribe((isPanelHidden: boolean) => this.isPanelHidden = isPanelHidden);
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
