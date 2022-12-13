import { ApiLink } from './../constant/api-link';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignoutService {

  constructor(private http: HttpClient) { }

  signout(SESSION_ID: string): void {
    let headers: HttpHeaders = new HttpHeaders().set("sessionId", SESSION_ID);
    this.http.get<string>(`${ApiLink.local}/signout`, { headers: headers }).subscribe({
      next: (message) => { console.info(message) },
      error: (e) => { console.warn(e) },
      complete: () => { console.info('complete') }
    });
  }
}
