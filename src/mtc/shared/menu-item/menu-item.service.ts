import { MenuItem } from './menu-item.model';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MenuItemService {
  private menuItemList: MenuItem[];

  constructor(
    private http: HttpClient
  ) {}

  public getMenuItemList(language: string): Observable<MenuItem[]> {
    if (this.menuItemList) {
      return of(this.menuItemList);
    } else {
      return this.http.get('./assets/config/menu-item-' + language + '.json')
        .pipe(
          map((res) => res as MenuItem[]),
          tap((menuItemList: MenuItem[]) => this.menuItemList = menuItemList)
        );
    }
  }
}
