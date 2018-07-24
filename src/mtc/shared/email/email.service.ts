import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Email } from './email.model';
import { Response } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable()
export class EmailService {

  constructor(
    private http: HttpService
  ) {}

  sendEmail(email: Email): Observable<Response> {
    return this.http.post('/emails', email)
      .pipe(
          map((response) => {
          return response;
        })
      );
  }
}
