import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Category } from './category.model';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
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

  getLiteCategories(): Observable<Category[]> {
    return this.appConfigService.getAppConfig().pipe(
      flatMap((appConfig: AppConfig) => {
        this.appConfig = appConfig;
        return this.http.get('/lite-categories');
      }),
      map((response) => {
        const categories = response as Category[];
        for (const category of categories) {
          category.firstPic = this.sanitizePictureUrl(category.firstPic as string);
        }
        return categories;
      })
    );
  }

  getCategories(): Observable<Category[]> {
    if (this.categories.length) {
      return of(this.categories);
    } else {
      return this.appConfigService.getAppConfig()
        .pipe(
          flatMap((appConfig: AppConfig) => {
            this.appConfig = appConfig;
            return this.http.get('/categories');
          }),
          map((response) => {
            const categories = response as Category[];
            return categories.map(category => this.sanitizeCategory(category));
          }),
          tap((categories) => this.categories = categories)
        );
    }
  }

  private sanitizePictureUrl(url: string): SafeUrl {
    const urlToSanitize = 'url("' + this.appConfig.serviceUrl + encodeURI(url) + '")';
    return this.sanitizer.bypassSecurityTrustStyle(urlToSanitize);
  }

  private sanitizeCategory(category: Category): Category {
    const categoryToReturn: Category = Object.assign(category);
    categoryToReturn.firstPic = this.sanitizePictureUrl(categoryToReturn.firstPic as string);
    categoryToReturn.pictures = (categoryToReturn.pictures as any as string)
      .split(', ')
      .map(picture => this.sanitizePictureUrl(picture as string));
    categoryToReturn.bigPictures = (categoryToReturn.bigPictures as any as string)
      .split(', ')
      .map(picture => this.sanitizePictureUrl(picture as string));
    categoryToReturn.isShown = true;
    return categoryToReturn;
  }
}
