import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ApiLink } from '../constant/api-link';
import { Update } from '../interface/update';
import { UpdateProfileResponse } from '../interface/update-profile-response';

@Injectable({
  providedIn: 'root'
})
export class UpdateProfileService {

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  requestToUpdate(updateData: Update) {
    let authsJson = localStorage.getItem('AUTHORITIES');
    let auths = (authsJson == null) ? [] : JSON.parse(authsJson);
    const claims = {
      email: localStorage.getItem('EMAIL'),
      authorities: auths
    };
    this.http.post<UpdateProfileResponse>(`${ApiLink.local}/user/update`, updateData);
  }
}
