import { ApiLink } from './../constant/api-link';
import { catchError, Observable } from 'rxjs';
import { Login } from './../interface/login';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Functions } from '../lib/functions';
import { LoginResponse } from '../interface/login-response';
import { Tab } from '../interface/tab';
import { NavbarService } from './navbar.service';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  /**
   * Constructor injection of dependencies.
   * @param http Allows for calling the API to log a user in and get the correct navigation bar tabs for the user.
   */
  constructor(private http: HttpClient, private navbarService: NavbarService) { }

  /**
   * Sends the login form to the API.
   * @param loginData The form containing the login information of the user.
   * @returns Returns an Observable containing the response of the API.
   */
  loginUser(loginData: Login): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${ApiLink.local}/login`, loginData)
    .pipe(catchError(Functions.handleHttpError));
  }
  
  /**
   * Obtains the correct set of navigation bar links for the user.
   * @param jwt The JSON web token of the user.
   * @returns Returns an Observable containing a list of of Tab objects which are the navigation bar links.
   */
  getTabs(jwt: string): Observable<Tab[]> {
    let headers: HttpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set("Authorization", `Bearer ${jwt}`)
      .set("jwt", jwt);
      
    return this.http.get<Array<Tab>>(`${ApiLink.local}/tabs`, {headers: headers})
      .pipe(catchError(Functions.handleHttpError));;
  }

  signalLogin(jwt: string): void {
    this.getTabs(jwt).subscribe({
      next: (response) => { this.navbarService.setTabs(response) }, // call NavbarService.setTabs(response);
      error: (e) => console.log(e),
      complete: () => console.log('done')
    });
  }
}
