import { Anchor } from './anchor.model';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AnchorService {
  private anchorList: Anchor[];

  constructor(
    private http: HttpClient
  ) {}

  public getAnchorList(language: string): Observable<Anchor[]> {
    if (this.anchorList) {
      return of(this.anchorList);
    } else {
      return this.http.get('./assets/config/anchor-' + language + '.json')
        .pipe(
          map((res) => res as Anchor[]),
          tap((anchorList: Anchor[]) => this.anchorList = anchorList)
        );
    }
  }
}
