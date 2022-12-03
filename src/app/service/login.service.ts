import { ApiLink } from './../constant/api-link';
import { catchError, Observable, throwError } from 'rxjs';
import { Login } from './../interface/login';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Functions } from '../lib/functions';
import { LoginResponse } from '../interface/login-response';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  loginUser(loginData: Login): Observable<LoginResponse>{
    /* returns CustomResponse wrapped in Observable; to be processed in the login.component.ts */
    return this.http.post<LoginResponse>(`${ApiLink.local}/login`, loginData)
    .pipe(catchError(Functions.handleHttpError));
  }

  isLoggedIn(sessionId: string | null): boolean{
    let result = false;
    if(sessionId == null){
      return result;
    }
    
    const headers = new HttpHeaders()
    .set('Authorization', sessionId);
    this.http.get<any>(`${ApiLink.local}/verify`, {'headers': headers}).subscribe({
      next: () => {
        result = true;
      },
      error: () => {
        result = false
      }
    });
    return result;
  }
}
