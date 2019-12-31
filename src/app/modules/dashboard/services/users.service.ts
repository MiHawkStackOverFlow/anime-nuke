import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { User } from './../models/user';
import { HttpErrorHandler, HandleError } from './../../../shared/services/http-error-handler/http-error-handler.service';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({ providedIn: 'root' })
export class UserService {
  url = 'api/users';
  private handleError: HandleError;

  constructor(private http: HttpClient,  httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('UserService');
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.url, user, httpOptions)
      .pipe(
        catchError(this.handleError('addUser', user))
      );
  }

  getUsers(): Observable<Array<User>> {
      return this.http.get<Array<User>>(this.url)
      .pipe(
        catchError(this.handleError('getUsers', []))
      );
  }

  updateUser(user: User): Observable<User> {
    const updateUrl = `${this.url}/${user.id}`;
    // let userData = user + '/' + user.id
    httpOptions.headers = httpOptions.headers.set('Authorization', 'my-new-auth-token');

    return this.http.put<User>(updateUrl, user, httpOptions)
      .pipe(
        catchError(this.handleError('updateUser' , user))
      );
  }

  deleteUser(id: number): Observable<any> {
    const deleteUrl = `${this.url}/${id}`;
    return this.http.delete(deleteUrl, httpOptions)
      .pipe(
        catchError(this.handleError('deleteUser'))
      );
  }

}