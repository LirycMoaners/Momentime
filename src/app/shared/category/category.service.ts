import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Category } from './category.model';
import { DomSanitizer } from '@angular/platform-browser';
import { AppConfigService } from '../app-config/app-config.service';
import { AppConfig } from '../app-config/app-config.model';

@Injectable()
export class CategoryService {

  categories: Category[] = [];

  constructor(
    private http: HttpService,
    private appConfigService: AppConfigService,
    private sanitizer: DomSanitizer
  ) {}

  getCategories(): Observable<Category[]> {
    if (this.categories.length) {
      return Observable.of(this.categories);
    } else {

      return this.appConfigService.chargerAppConfig().flatMap((appConfig: AppConfig) => {
        return this.http.get('/categories')
          .map((response) => {
            const categories = response.json() as Category[];
            for (const category of categories) {
              const url = `url(${appConfig.serviceUrl + encodeURI(category.firstPic as string)})`;
              category.firstPic = this.sanitizer.bypassSecurityTrustStyle(url);
            }
            return categories;
          });
        })
        .do((categories) => this.categories = categories);
    }
  }
}
