import { Anchor } from '../shared/anchor/anchor.model';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class HomeService {

  anchorList: Anchor[] = [
    {name: 'Presentation', fragment: 'presentation'},
    {name: 'Galerie', fragment: 'portfolio'},
    {name: 'Offre', fragment: 'pricing'},
    {name: 'A Propos', fragment: 'about'},
    {name: 'Contact', fragment: 'contact'},
  ];

  private _subject = new Subject<any>();

  newEvent(event): void {
    this._subject.next(event);
  }

  getEvent(): Observable<any> {
    return this._subject.asObservable();
  }
}
