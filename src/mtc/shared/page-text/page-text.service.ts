import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { PageText } from './page-text.model';

@Injectable()
export class PageTextService {
  private text: PageText;

  constructor(
    private http: Http
  ) {}

  public getText(page: string, language: string): Observable<PageText> {
    if (this.text) {
      return of(this.text);
    } else {
      return this.http.get('./assets/config/text-' + page + '-' + language + '.json')
        .pipe(
          map((res) => res.json() as PageText),
          tap((text: PageText) => this.text = text)
        );
    }
  }
}
