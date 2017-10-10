import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PanelService {
  isHiddenSubject: Subject<boolean> = new Subject<boolean>();

  constructor() {
    this.isHiddenSubject.next(true);
  }

  getIsHidden(): Observable<boolean> {
    return this.isHiddenSubject.asObservable();
  }

  modifyIsHidden(nextValue: boolean): void {
    this.isHiddenSubject.next(nextValue);
  }
}
