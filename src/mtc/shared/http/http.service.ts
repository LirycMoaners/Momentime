import { Http, Response, RequestOptionsArgs, RequestOptions, RequestMethod, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../app-config/app-config.model';
import { Observable } from 'rxjs';
import { AppConfigService } from '../app-config/app-config.service';
import { flatMap } from 'rxjs/operators';

@Injectable()
export class HttpService {
  private appConfig: AppConfig;
  private options: RequestOptionsArgs;

  constructor(
    private http: Http,
    private appConfigService: AppConfigService
  ) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    this.options = new RequestOptions({method: RequestMethod.Get, headers: headers });
  }

  public get(webApiUrl: string, options?: RequestOptionsArgs): Observable<Response> {
    this.options = options ? options : this.options;
    return this.appConfigService.getAppConfig()
      .pipe(
        flatMap((appConfig: AppConfig) => this.http.get(appConfig.serviceUrl + webApiUrl, options))
      );
  }

  public post(webApiUrl: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    this.options = options ? options : this.options;
    return this.appConfigService.getAppConfig()
      .pipe(
        flatMap((appConfig: AppConfig) => this.http.post(appConfig.serviceUrl + webApiUrl, body, options))
      );
  }
}
