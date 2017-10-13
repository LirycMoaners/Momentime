import { MenuItem } from './menu-item.model';
import { Injectable } from '@angular/core';

@Injectable()
export class MenuItemService {
  menuItemList: MenuItem[] = [
    {name: 'Accueil', route: '/accueil'},
    {name: 'Gallerie', route: ''},
    {name: 'Offre', route: ''},
    {name: 'Contact', route: '/accueil', fragment: 'contact'},
  ];
}
