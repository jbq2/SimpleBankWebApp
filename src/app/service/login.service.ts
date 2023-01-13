import { ApiLink } from './../constant/api-link';
import { catchError, Observable, lastValueFrom } from 'rxjs';
import { Login } from './../interface/login';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Functions } from '../lib/functions';
import { LoginResponse } from '../interface/login-response';
import { Tab } from '../interface/tab';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  loginUser(loginData: Login): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${ApiLink.local}/login`, loginData)
    .pipe(catchError(Functions.handleHttpError));
  }
  
  getTabs(jwt: string): Observable<Array<Tab>> {
    let headers: HttpHeaders = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set("Authorization", `Bearer ${jwt}`)
    .set("jwt", jwt);
    return this.http.get<Array<Tab>>(`${ApiLink.local}/tabs`, {headers: headers})
      .pipe(catchError(Functions.handleHttpError));;
  }

  async checkSessionStatus(jwt: string): Promise<string> {
    if(jwt == null){
      jwt = '';
    }
    let headers: HttpHeaders = new HttpHeaders()
    .set("Authorization", `Bearer ${jwt}`)
    .set("jwt", jwt);
    return await lastValueFrom(this.http.get<string>(`${ApiLink.local}/verify`, {headers: headers}));
  }
}
