import { Injectable } from '@angular/core';
import { AppConfig } from '../app-config/app-config.model';
import { Observable } from 'rxjs';
import { AppConfigService } from '../app-config/app-config.service';
import { flatMap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class HttpService {
  private headers: HttpHeaders;

  constructor(
    private http: HttpClient,
    private appConfigService: AppConfigService
  ) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  public get(webApiUrl: string, headers?: HttpHeaders): Observable<any> {
    this.headers = headers ? headers : this.headers;
    return this.appConfigService.getAppConfig()
      .pipe(
        flatMap((appConfig: AppConfig) =>
          this.http.get(appConfig.serviceUrl + appConfig.subdomain + webApiUrl, {headers: headers})
        )
      );
  }

  public post(webApiUrl: string, body: any, headers?: HttpHeaders): Observable<any> {
    this.headers = headers ? headers : this.headers;
    return this.appConfigService.getAppConfig()
      .pipe(
        flatMap((appConfig: AppConfig) =>
          this.http.post(appConfig.serviceUrl + appConfig.subdomain + webApiUrl, body, {headers: headers})
        )
      );
  }
}
