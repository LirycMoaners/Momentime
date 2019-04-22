import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { PageText } from './page-text.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PageTextService {
  private text: PageText;

  constructor(
    private http: HttpClient
  ) {}

  public getText(page: string, language: string): Observable<PageText> {
    if (this.text) {
      return of(this.text);
    } else {
      return this.http.get('./assets/config/text-' + page + '-' + language + '.json')
        .pipe(
          map((res) => res as PageText),
          tap((text: PageText) => this.text = text)
        );
    }
  }
}
