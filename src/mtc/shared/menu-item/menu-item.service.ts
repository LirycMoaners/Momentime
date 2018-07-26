import { MenuItem } from './menu-item.model';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Http } from '@angular/http';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class MenuItemService {
  private menuItemList: MenuItem[];

  constructor(
    private http: Http
  ) {}

  public getMenuItemList(language: string): Observable<MenuItem[]> {
    if (this.menuItemList) {
      return of(this.menuItemList);
    } else {
      return this.http.get('./assets/config/menu-item-' + language + '.json')
        .pipe(
          map((res) => res.json() as MenuItem[]),
          tap((menuItemList: MenuItem[]) => this.menuItemList = menuItemList)
        );
    }
  }
}
