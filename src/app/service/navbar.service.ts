import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
import { Tab } from '../interface/tab';
import { ApiLink } from '../constant/api-link';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  private httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json'}) };
  private authChangeEventEmitter = new BehaviorSubject<Tab[]>([
    {name: 'Login', path: '/login'},
    {name: 'Register', path: '/register'}
  ]);

  constructor(private http: HttpClient) { }

  getLinks(): Observable<Tab[]> {
    return this.http.get<Tab[]>(`${ApiLink.local}/tabs`, this.httpOptions).pipe(
      tap(() => {console.log("Fetched links.")}),
      catchError(this.handleError("getLinks"))
    );
  }

  private handleError(operation: string = 'operation') {
    return (error: any): Observable<Tab[]> => {
      console.error(`Operation "${operation}" has failed: ${error}`);

      return of([] as Tab[]); 
    }
  }

  setTabs(response: Tab[]) {  
    this.authChangeEventEmitter.next(response);
  }

  getLinksSubject(): BehaviorSubject<Tab[]> {
    return this.authChangeEventEmitter;
  }
}
