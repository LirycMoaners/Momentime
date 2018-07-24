import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Category } from './category.model';
import { DomSanitizer } from '@angular/platform-browser';
import { AppConfigService } from '../app-config/app-config.service';
import { AppConfig } from '../app-config/app-config.model';
import { flatMap, map, tap } from 'rxjs/operators';

@Injectable()
export class CategoryService {

  categories: Category[] = [];
  appConfig: AppConfig;

  constructor(
    private http: HttpService,
    private appConfigService: AppConfigService,
    private sanitizer: DomSanitizer
  ) {}

  getCategories(): Observable<Category[]> {
    if (this.categories.length) {
      return of(this.categories);
    } else {

      return this.appConfigService.chargerAppConfig()
        .pipe(
          flatMap((appConfig: AppConfig) => {
            this.appConfig = appConfig;
            return this.http.get('/categories');
          }),
          map((response) => {
            const categories = response.json() as Category[];
            for (const category of categories) {
              const url = `url(${this.appConfig.serviceUrl + encodeURI(category.firstPic as string)})`;
              category.firstPic = this.sanitizer.bypassSecurityTrustStyle(url);
            }
            return categories;
          }),
          tap((categories) => this.categories = categories)
        );
    }
  }
}
