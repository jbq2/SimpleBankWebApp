import { Injectable } from '@angular/core';
import { Tab } from '../interface/tab';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class NavbarProtoService {

  private navbarLinksEmitter: BehaviorSubject<Tab[]> = new BehaviorSubject<Tab[]>([]);
  
  private defaultLinks: Tab[] = [
    {name: 'Login', path: '/login'},
    {name: 'Register', path: '/register'}
  ];

  getLinksObservable(): Observable<Tab[]> {
    this.updateLinks();
    return this.navbarLinksEmitter.asObservable();
  }

  private updateLinks(): void {
    let jwt = (localStorage.getItem('jwt') == null) ? 'none' : localStorage.getItem('jwt')!;
    let observer = {
      next: (response: Tab[]) => { this.navbarLinksEmitter.next(response); },
      error:(e: any) => { this.handleError(e, 'updateLinks()') },
      complete: () => { console.log('Completed updateLinks()'); }
    };

    this.loginService.getTabs(jwt).subscribe(observer);
  }

  private handleError(e: any, operation: string = 'operation'): void {
    console.log(`Error encountered performing 'NavbarProtoService${operation}': ${e}`);
    this.navbarLinksEmitter.next(this.defaultLinks);
  }

  constructor(private loginService: LoginService) { }
}
