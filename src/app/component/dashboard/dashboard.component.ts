import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Functions } from 'src/app/lib/functions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  loggedIn: boolean = false;
  redirectedFromLogin: boolean = false;
  jwt: string = 'none';

  /**
   * Injects various dependencies into private attributes of the DashboardComponent class.
   * @param functions Contains useful function for checking login status that communicate with a matching class in the API.
   * @param router Adds navigation from this component to another page.
   * @param route Gathers URL query parameters if thera are any.
   */
  constructor(private functions: Functions, private router: Router, private route: ActivatedRoute) { }

  /**
   * Initializes this class when the user enters a page that uses this component.  Initialization of the component consists of checking
   * if the user is logged in, and if so, the JSON web token is displayed on the page.  If the user is not logged in, they are
   * redirected to the login page with a message.
   */
  ngOnInit(): void {
    let currJwt = (localStorage.getItem('jwt') == null) ? 'none' : localStorage.getItem('jwt')!;
    this.functions.isLoggedIn(currJwt).then((response) => {
      if(response.loggedIn) {
        this.route.queryParams.subscribe({
          next: (params) => {
            this.redirectedFromLogin = params['redirect'] != null;
          }
        })
        this.loggedIn = true;
        this.jwt = response.updatedJwt;
        localStorage.setItem("jwt", response.updatedJwt);
      }
      else {
        this.router.navigate(['/login'], { queryParams: { redirectFrom: 'dashboard' } })
      }
    }).catch((error) => {
      console.warn(error);
      this.router.navigate(['/login'], { queryParams: { redirectFrom: 'dashboard' } });
    });
  }

}
