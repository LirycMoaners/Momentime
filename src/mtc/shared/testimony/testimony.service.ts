import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DomSanitizer, SafeStyle } from '../../../../node_modules/@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TestimonyService {
  private testimonyList: SafeStyle[];

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {}

  public getTestimonyList(): Observable<SafeStyle[]> {
    if (this.testimonyList) {
      return of(this.testimonyList);
    } else {
      return this.http.get('./assets/config/testimony.json')
        .pipe(
          map((res) => {
            const testimonyList: string[] | SafeStyle[] = res as string[];
            for (let i = 0; i < testimonyList.length; i++) {
              testimonyList[i] = this.sanitizer.bypassSecurityTrustResourceUrl(testimonyList[i] as string);
            }
            return testimonyList;
          }),
          tap((testimonyList: SafeStyle[]) => this.testimonyList = testimonyList)
        );
    }
  }
}
