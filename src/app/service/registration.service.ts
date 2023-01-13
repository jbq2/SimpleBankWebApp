import { ApiLink } from './../constant/api-link';
import { Registration } from './../interface/registration';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Functions } from '../lib/functions';
import { RegistrationResponse } from '../interface/registration-response';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }

  registerUser(registrationData: Registration): Observable<RegistrationResponse> {
    return this.http.post<RegistrationResponse>(`${ApiLink.local}/register`, registrationData)
      .pipe(catchError(Functions.handleHttpError));
  }
}
