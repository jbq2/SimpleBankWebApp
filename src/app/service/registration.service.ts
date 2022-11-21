import { Registration } from './../interface/registration';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomResponse } from '../interface/response';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private readonly url = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) { }

  registerUser(registrationData: Registration): Observable<CustomResponse> {
    /* returns an a Response object wrapped in an Observable */
    return this.http.post<CustomResponse>(`${this.url}/register`, registrationData);
  }
}
