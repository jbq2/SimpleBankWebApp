import { Router, ActivatedRoute } from '@angular/router';
import { SignoutService } from './../../service/signout.service';
import { Pages } from '../../constant/pages';
import { LoginService } from './../../service/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  baseUrl: string = 'http://localhost:4200';
  tabs = new Map([
    ['Register', `${this.baseUrl}${Pages.tabLinks.get('Register')}`],
    ['Login', `${this.baseUrl}${Pages.tabLinks.get('Login')}`]
  ]);

  constructor(private loginService: LoginService, private signoutService: SignoutService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    /**
     * calls getTabs from loginService to receive a Map of tabs
     * contains a next and error clause for this observable (complete clause is pretty irrelevant)
     */
    this.loginService.getTabs(localStorage.getItem("SESSION_ID")!).subscribe({
      next: (response) => { 
        /**
         * iterate through the map keys, setting each key (tab name) to hold its respective value from Pages.links
         */
        this.route.params.subscribe({
          next: (params) => {
            if(params['redirectFrom'] != 'signout'){
              this.tabs = new Map(Object.entries(response));
              console.log(this.tabs);
              this.tabs.forEach((value: string, key: string) => {
                this.tabs.set(key, Pages.tabLinks.get(key)!);
              });
            }
          }
        });
      },
      error: () => {
        /**
         * an error occurs when there is no session that exists for the user
         * if the localStorge of the user is populated, they have logged in before and thus their session has timed out
         * this error removes the SESSION_ID and AUTHORITIES fields in localStorage
         */
        if(localStorage.length != 0){
          console.warn("Your session has expired");
        }
        localStorage.removeItem("SESSION_ID");
        localStorage.removeItem("AUTHORITIES");
      },
      complete: () => { console.info("complete"); }
    })
  }

  signout() {
    let SESSION_ID = (localStorage.getItem("SESSION_ID") == null) ? '' : localStorage.getItem("SESSION_ID")!;
    this.signoutService.signout(SESSION_ID);
    this.router.navigate(['/login'], { queryParams: {redirectFrom: 'signout'} })
  }
}