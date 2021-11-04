import { Injectable } from "@angular/core";
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
  } from '@angular/common/http';
  import { catchError } from 'rxjs/operators';
  import { Router } from "@angular/router";
  import { AuthService } from "../services/auth.service";
import { throwError } from "rxjs";
import Swal from "sweetalert2";

@Injectable()

export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService, public router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.auth.getAuthorizationToken()
    request = request.clone({ setHeaders: { Authorization: `Bearer ${authToken}` } })
    return next.handle(request).pipe(catchError(err => {
      if (err.status==401||err.status==403) {
          this.auth.clearToken();
          // window.alert("You are not authenticated. Please log in.");
          Swal.fire("You are not authenticated. Please log in.")
          this.router.navigate(['/signin']);
      }
      const error = (err && err.error && err.error.message) || err.statusText;
      return throwError(error);
  }));
}
}