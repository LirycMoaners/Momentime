import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { AppConfig } from './app-config.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AppConfigService {
  private appConfig: AppConfig;

  constructor(
    private http: Http
  ) {}

  public chargerAppConfig(): Observable<AppConfig> {
    if (this.appConfig) {
      return Observable.of(this.appConfig);
    } else {
      return this.http.get('./assets/config/app-config.json')
        .map((res) => res.json() as AppConfig)
        .do((appConfig: AppConfig) => this.appConfig = appConfig);
    }
  }
}
