import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiLink } from '../constant/api-link';
import { Update } from '../interface/update';

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
    return this.http.get<string>(`${ApiLink.local}/user/content`, {headers: headers});
  }

  requestToUpdate(updateData: Update) {
   
  }
}
