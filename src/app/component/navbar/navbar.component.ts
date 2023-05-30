import { Router, ActivatedRoute } from '@angular/router';
import { SignoutService } from './../../service/signout.service';
import { LoginService } from './../../service/login.service';
import { Component, OnInit } from '@angular/core';
import { Tab } from 'src/app/interface/tab';
import { BehaviorSubject, Observable, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  baseUrl: string = 'http://localhost:4200';
  tabs: Array<Tab> = [];

  tabs$!: Observable<Tab[]>;
  private defaultTabs: Tab[] = [
    {name: 'Login', path: '/login'},
    {name: 'Register', path: '/register'}
  ];
  private authChangeEventListener = new BehaviorSubject<Tab[]>(this.defaultTabs);

  /**
   * Injects various objects into the private attributes of the NavbarComponent object.
   * @param loginService Provides the method that calls the API to verify user login.
   * @param signoutService Provides method that calls the API to log a user out.
   * @param router Adds navigation from this component to another page.
   * @param route Gathers URL query parameters if thera are any.
   */
  constructor(private loginService: LoginService, private signoutService: SignoutService, private router: Router, private route: ActivatedRoute) { }

  /**
   * Initializes the class when a user enters a page that uses this component.  The tabs are gathered from the API.
   */
  ngOnInit() {
    let jwt = (localStorage.getItem('jwt') == null) ? 'none' : localStorage.getItem('jwt')!;

    this.tabs$ = this.authChangeEventListener.pipe(distinctUntilChanged());
    /* OLD LOGIC */
    this.loginService.getTabs(jwt).subscribe({
      next: (response) => { 
        this.route.params.subscribe({
          next: (params) => {
            if(params['redirectFrom'] != 'signout') {
              this.tabs = response;
            }
          }
        });
      },
      error: (e) => {
        if(localStorage.length != 0){
          console.warn(e);
        }
        localStorage.removeItem("jwt");
      },
      complete: () => { console.info("complete"); }
    })
  }

  /**
   * Called when the user clicks on the "Logout" option in the navigation bar, causing the JSON web token to be removed on the client side.
   */
  signout() {
    this.signoutService.signout();
    localStorage.removeItem('jwt');
    this.router.navigate(['/login'], { queryParams: {redirectFrom: 'signout'} })
  }
}