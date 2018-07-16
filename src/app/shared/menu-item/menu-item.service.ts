import { MenuItem } from './menu-item.model';
import { Injectable } from '@angular/core';

@Injectable()
export class MenuItemService {
  menuItemList: MenuItem[] = [
    {name: 'Accueil', route: '/accueil'},
    {name: 'Galerie', route: '/gallery'},
    {name: 'Offre', route: '/accueil', fragment: 'pricing'},
    {name: 'Contact', route: '/accueil', fragment: 'contact'},
  ];
}
