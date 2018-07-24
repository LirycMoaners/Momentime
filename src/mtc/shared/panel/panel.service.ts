import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

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
