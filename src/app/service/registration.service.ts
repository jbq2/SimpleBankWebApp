import { ApiLink } from './../constant/api-link';
import { Registration } from './../interface/registration';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Functions } from '../lib/functions';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }

  registerUser(registrationData: Registration): Observable<any> {
    /* returns an a Response object wrapped in an Observable */
    return this.http.post<Map<string, string>>(`${ApiLink.local}/register`, registrationData)
    .pipe(catchError(Functions.handleHttpError));
    // return this.http.get<any>(`${ApiLink.local}/list`);
  }
}
