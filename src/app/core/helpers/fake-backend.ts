import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

import  { EncrdecrService } from './../services/encrypt-decrypt/encrdecr.service';
import { User } from './../models/user';
import { Role } from './../models/role';

const users: User[] = [
    { id: 1, username: 'abhi', password: 'abhi', firstName: 'Abhishek', lastName: 'Sharma', role: Role.Admin },
    { id: 2, username: 'test', password: 'test', firstName: 'Test', lastName: 'User', role: Role.User }
];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    constructor(private encrDecr: EncrdecrService) {  }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { headers, body } = request;

        const authHeader = headers.get('Authorization'); 
        const isLoggedIn = authHeader && authHeader.startsWith('Bearer fake-jwt-token');
        const roleString = isLoggedIn && authHeader.split('.')[1];
        const role = roleString ? Role[roleString] : null;

        let decryptedPassword;
        if(body) {
            decryptedPassword = this.encrDecr.get(body.username, body.password);
            console.log("decrypted password at fake backend", decryptedPassword, body.password);
        }

        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {
            // authenticate - public
            if (request.url.endsWith('/users/authenticate') && request.method === 'POST') {
                console.log("test username", request.body.username);
                console.log("test password", decryptedPassword);
                const user = users.find(x => x.username === request.body.username && x.password === decryptedPassword);
                if (!user) return error('Username or Password is incorrect');
                return ok({
                    id: user.id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                    token: `fake-jwt-token.${user.role}`
                });
            }
            // get user by id - admin or user (user can only access their own record)
            if (request.url.match(/\/users\/\d+$/) && request.method === 'GET') {
                if (!isLoggedIn) return throwError({ status: 401, error: { message: 'Unauthorised' } });
                
                 // get id from request url
                 let urlParts = request.url.split('/');
                 let id = parseInt(urlParts[urlParts.length - 1]);
 
                 // only allow normal users access to their own record
                 const currentUser = users.find(x => x.role === role);
                 if (id !== currentUser.id && role !== Role.Admin) return throwError({ status: 401, error: { message: 'Unauthorised' } });
 
                 const user = users.find(x => x.id === id);
                 return of(new HttpResponse({ status: 200, body }));
            }

            // pass through any requests not handled above
            return next.handle(request);
            
        }))
        // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize());

        // private helper functions

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function error(message) {
            return throwError({ error: { message } });
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true,
    deps: [ EncrdecrService ]
};