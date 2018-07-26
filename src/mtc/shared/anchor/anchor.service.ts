import { Anchor } from './anchor.model';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Http } from '@angular/http';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class AnchorService {
  private anchorList: Anchor[];

  constructor(
    private http: Http
  ) {}

  public getAnchorList(language: string): Observable<Anchor[]> {
    if (this.anchorList) {
      return of(this.anchorList);
    } else {
      return this.http.get('./assets/config/anchor-' + language + '.json')
        .pipe(
          map((res) => res.json() as Anchor[]),
          tap((anchorList: Anchor[]) => this.anchorList = anchorList)
        );
    }
  }
}
