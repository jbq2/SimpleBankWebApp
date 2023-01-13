import { ApiLink } from './../constant/api-link';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignoutService {

  constructor(private http: HttpClient) { }

  signout() {
    this.http.get<string>(`${ApiLink.local}/logout`).subscribe({
      next: (message) => { console.info(message) },
      error: (e) => { console.warn(e) },
      complete: () => { console.info('complete') }
    });
  }
}
