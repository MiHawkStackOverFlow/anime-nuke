import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Observable, forkJoin } from 'rxjs';
import { catchError } from 'rxjs/operators';

// TODO : create model 
// import { User } from './../models/user';
import { UserService } from '../../../dashboard/services/users.service';
import { HttpErrorHandler, HandleError } from '../../../../shared/services/http-error-handler/http-error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  url = 'http://www.mocky.io/v2/5e21caef2f0000780077d92e';
  private handleError: HandleError;

  constructor(private http: HttpClient,  httpErrorHandler: HttpErrorHandler, private userService: UserService) {
    this.handleError = httpErrorHandler.createHandleError('UserService');
  }

  getAccounts(): Observable<Array<any>> {
    return this.http.get<Array<any>>(this.url)
    .pipe(
      catchError(this.handleError('getAccounts', []))
    );
  }

  getAccountDetails() {
    return forkJoin(this.userService.getUsers(), this.getAccounts());
  }

}
