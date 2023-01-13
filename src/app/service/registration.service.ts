import { ApiLink } from './../constant/api-link';
import { Registration } from './../interface/registration';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Functions } from '../lib/functions';
import { RegistrationResponse } from '../interface/registration-response';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  /**
   * Constructor injection of dependencies.
   * @param http Allows for communication with the API to process a registration request.
   */
  constructor(private http: HttpClient) { }

  /**
   * Sends the registration form to the API.
   * @param registrationData The form containing the registration information of the user.
   * @returns Returns an Observable containing the response of the API.
   */
  registerUser(registrationData: Registration): Observable<RegistrationResponse> {
    return this.http.post<RegistrationResponse>(`${ApiLink.local}/register`, registrationData)
      .pipe(catchError(Functions.handleHttpError));
  }
}
