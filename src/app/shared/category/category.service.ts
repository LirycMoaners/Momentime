import { Category } from './category.model';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, RequestMethod, Headers } from '@angular/http';

@Injectable()
export class CategoryService {

  categories: Category[] = [];

  constructor(
    private http: Http
  ) {}

  getCategories(): Observable<Category[]> {
    if (this.categories.length) {
      return Observable.of(this.categories);
    } else {
      const headers = new Headers({ 'Content-Type': 'application/json' });
      const options: RequestOptions = new RequestOptions({method: RequestMethod.Get, headers: headers });

      return this.http.get('http://localhost:3000', options)
        .map((response) => {
          return response.json() as Category[];
        })
        .do((categories) => this.categories = categories);
    }
  }
}
