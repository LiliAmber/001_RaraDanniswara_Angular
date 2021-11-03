import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Card } from '../Models/Card';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  endpoint: string = 'http://localhost:5000/api/Payment'

  constructor(private http: HttpClient, private router: Router) { }

  getCard(): Observable<any> {
    let api = `${this.endpoint}`
    return this.http
      .get(api)
      .pipe(catchError(this.handleError))
  }

  getCardById(id: number): Observable<any> {
    let api = `${this.endpoint}/${id}`
    return this.http
      .get(api)
      .pipe(catchError(this.handleError))
  }

  createCard(newCard: Card): Observable<any> {
    let api = `${this.endpoint}`
    return this.http
      .post(api, newCard)
      .pipe(catchError(this.handleError))

  }

  updateCard(id: number, card: Card): Observable<any> {
    let api = `${this.endpoint}/${id}`
    return this.http
      .put(api, card)
      .pipe(catchError(this.handleError))
  }

  deleteCard(id: number) {
    console.log(id, '<<<di service del')
    let api = `${this.endpoint}/${id}`
    return this.http
      .delete(api)
      .pipe(catchError(this.handleError))
  }

  handleError(err: HttpErrorResponse) {
    if(err.error instanceof ErrorEvent) {
      return throwError(err.error.message)
    } else {
      return throwError(`Server-side error code: ${err.status}\n Msg:${err.message}`)
    }
  }
}
