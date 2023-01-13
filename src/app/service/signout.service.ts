import { ApiLink } from './../constant/api-link';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignoutService {

  /**
   * Constructor injection of dependencies.
   * @param http Allows for communication with the API to process a logout request.
   */
  constructor(private http: HttpClient) { }

  /**
   * Calls the API to process a logout request made by the user.  The web application removes the JSON web token stored in the local storage.
   */
  signout() {
    this.http.get<string>(`${ApiLink.local}/logout`).subscribe({
      next: (message) => { console.info(message) },
      error: (e) => { console.warn(e) },
      complete: () => { console.info('complete') }
    });
  }
}
