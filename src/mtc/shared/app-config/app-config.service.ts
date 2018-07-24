import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { AppConfig } from './app-config.model';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class AppConfigService {
  private appConfig: AppConfig;

  constructor(
    private http: Http
  ) {}

  public chargerAppConfig(): Observable<AppConfig> {
    if (this.appConfig) {
      return of(this.appConfig);
    } else {
      return this.http.get('./assets/config/app-config.json')
        .pipe(
          map((res) => res.json() as AppConfig),
          tap((appConfig: AppConfig) => this.appConfig = appConfig)
        );
    }
  }
}
