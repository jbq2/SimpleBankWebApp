import { ApiLink } from './../constant/api-link';
import { Observable } from 'rxjs';
import { Login } from './../interface/login';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomResponse } from '../interface/response';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  loginUser(loginData: Login): Observable<CustomResponse>{
    /* returns CustomResponse wrapped in Observable; to be processed in the login.component.ts */
    return this.http.post<CustomResponse>(`${ApiLink.local}/login`, loginData);
  }
}
