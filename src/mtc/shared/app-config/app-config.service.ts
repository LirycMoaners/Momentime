import { Injectable } from '@angular/core';
import { AppConfig } from './app-config.model';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppConfigService {
  private appConfig: AppConfig;

  constructor(
    private http: HttpClient
  ) {}

  public getAppConfig(): Observable<AppConfig> {
    if (this.appConfig) {
      return of(this.appConfig);
    } else {
      return this.http.get('./assets/config/app-config.json')
        .pipe(
          map((res) => res as AppConfig),
          tap((appConfig: AppConfig) => this.appConfig = appConfig)
        );
    }
  }
}
