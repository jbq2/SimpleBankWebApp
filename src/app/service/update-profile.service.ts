import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { ApiLink } from '../constant/api-link';
import { Update } from '../interface/update';
import { UpdateProfileResponse } from '../interface/update-profile-response';
import { Functions } from '../lib/functions';

@Injectable({
  providedIn: 'root'
})
export class UpdateProfileService {

  constructor(private http: HttpClient) { }

  getPageContent(jwt: string) {
    let headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${jwt}`)
    .set('jwt', jwt);
    return this.http.get<string>(`${ApiLink.local}/user/content`, {headers: headers})
      .pipe(catchError(Functions.handleHttpError));;
  }

  requestToUpdate(jwt:string, updateData: Update) {
    let headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${jwt}`)
    .set('jwt', jwt);
    return this.http.post<UpdateProfileResponse>(`${ApiLink.local}/user/update`, updateData, {headers: headers})
      .pipe(catchError(Functions.handleHttpError));
  }
}
