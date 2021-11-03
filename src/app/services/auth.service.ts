import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { User } from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  endpoint: string = 'http://localhost:5000/api/AuthManagement'
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  get isAuthenticated() {
    // double-bang (!!) akan mengembalikan nilai truthy/falsy
    // dari sebuah value, beda dari negation (!) yang mengembalikan
    // nilai kebalikannya.
    return !!this.getAuthorizationToken()
  }

  getAuthorizationToken () {
    return localStorage.getItem('token')
  }

  setAuthorizationToken (token: string) {
    return localStorage.setItem('token', token)
  }

  clearToken() {
    return localStorage.clear()
  }

  signUp(user: User): Observable<any>{
    const api = `${this.endpoint}/Register`;

    return this.http
    .post(api, user)
    // .pipe( catchError(this.handleError) )
    .pipe(map((res: any) => {
      return res
    }))
  }

  signIn(user: User) {
    const api = `${this.endpoint}/Login`;

    return this.http
    .post(api, user)
    // .pipe( catchError(this.handleError) )
    .pipe(map((res: any) => {
      return res
    }))
  }

  handleError(err: HttpErrorResponse): Observable<any>{
    if(err.error instanceof ErrorEvent)
      return throwError(err.error.message)
    else
      return throwError(`Server-side error code: ${err.status}\nMessage: ${err.message}`)
  }
}
