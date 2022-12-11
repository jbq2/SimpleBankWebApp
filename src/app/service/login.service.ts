import { ApiLink } from './../constant/api-link';
import { catchError, Observable, lastValueFrom } from 'rxjs';
import { Login } from './../interface/login';
import { HttpClient, HttpHeaders} from '@angular/common/http';
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

  /**
   * getTabs is a function that gets a map from the API
   * getTabs corresponds to getTabs in TabsController
   * depending on the SESSION_ID, its existence in the DB, and the roles of the user, a set of tabs will be returned
   * Map of tabs is returns wrapped in an observable, which will be subscribed to in navbar.component.ts
   */
  getTabs(SESSION_ID: string): Observable<Map<string, string>> {
    let headers: HttpHeaders = new HttpHeaders().set("sessionId", SESSION_ID);
    return this.http.get<Map<string, string>>(`${ApiLink.local}/tabs`, {headers: headers});
  }

  async checkSessionStatus(SESSION_ID: string): Promise<string> {
    if(SESSION_ID == null){
      SESSION_ID = '';
    }
    let headers: HttpHeaders = new HttpHeaders().set("sessionId", SESSION_ID);
    return await lastValueFrom(this.http.get<string>(`${ApiLink.local}/verify`, {headers: headers}));
  }
}
