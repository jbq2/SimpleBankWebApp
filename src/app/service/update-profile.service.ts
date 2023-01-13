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

  /**
   * Constructor injection of dependencies.
   * @param http Allows for communication with the API to process a request to update a user's profile and gather the page contents.
   */
  constructor(private http: HttpClient) { }

  /**
   * Gathers the contents of the page personalized for the user.
   * @param jwt The JSON web token of the user.
   * @returns Rturns an Observable containing the response of the API.
   */
  getPageContent(jwt: string) {
    let headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${jwt}`)
    .set('jwt', jwt);
    return this.http.get<string>(`${ApiLink.local}/user/content`, {headers: headers})
      .pipe(catchError(Functions.handleHttpError));;
  }

  /**
   * Sends the update profile form to the API for validation.
   * @param jwt The JSON web token of the user.
   * @param updateData The form containing the necessary information to update the user's account in the database.
   * @returns Returns an Observable containing the response of the API.
   */
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
