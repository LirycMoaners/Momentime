import { Observable } from 'rxjs/Rx';
import { Injectable, SecurityContext } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Picture } from './picture.model';
import { AppConfigService } from '../app-config/app-config.service';
import { AppConfig } from '../app-config/app-config.model';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class PictureService {

  private pictures: Picture[] = [];
  private appConfig$: Observable<AppConfig>;

  constructor(
    private http: HttpService,
    private appConfigService: AppConfigService,
    private sanitizer: DomSanitizer
  ) {
    this.appConfig$ = this.appConfigService.chargerAppConfig();
  }

  getPictures(category?: string): Observable<Picture[]> {
    return category ? this.getPicturesFromCategory(category) : this.getAllPictures();
  }

  private getAllPictures(): Observable<Picture[]> {
    if (this.pictures.length) {
      return Observable.of(this.pictures);
    } else {
      return Observable.zip(
        this.appConfig$,
        this.http.get('/pictures')
      ).map(([appConfig, response]) => {
        const pictures: Picture[] = response.json() as Picture[];
        for (const picture of pictures) {
          const url = `url(${appConfig.serviceUrl + encodeURI(picture.url as string)})`;
          picture.url = this.sanitizer.bypassSecurityTrustStyle(url);
        }
        return pictures;
      }).do((pictures) => this.pictures = pictures);
    }
  }

  private getPicturesFromCategory(category: string): Observable<Picture[]> {
    const pics: Picture[] = this.pictures.filter((picture: Picture) => picture.category === category);

    if (pics) {
      return Observable.of(pics);
    } else {
      return Observable.zip(
        this.appConfig$,
        this.http.get('/pictures/' + category)
      ).map(([appConfig, response]) => {
        const pictures: Picture[] = response.json() as Picture[];
        for (const picture of pictures) {
          picture.url = appConfig.serviceUrl + picture.url;
        }
        return pictures;
      }).do((pictures) => this.pictures.push(...pictures));
    }
  }
}
