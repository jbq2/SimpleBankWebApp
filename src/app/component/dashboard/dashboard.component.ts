import { LoginService } from './../../service/login.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  loggedIn: boolean = false;
  redirectedFromLogin: boolean = false;
  jwt: string = '';

  constructor(private loginService: LoginService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    /**
     * upon getting to the dashboard, check the status of the user's session
     * if the user is logged in, FOR NOW print a welcome message including the session ID
     * if the user is not logged in, redirect to login page
     */
    this.loginService.checkSessionStatus(localStorage.getItem("jwt")!)
    .then((isLoggedIn) => {
      if(isLoggedIn){
        this.route.queryParams.subscribe({
          next: (params) => {
            this.redirectedFromLogin = params['redirect'] != null;
            console.log(this.redirectedFromLogin);
          }
        })
        console.info("logged in");
        this.loggedIn = true;
        this.jwt = localStorage.getItem("jwt")!;
      }
      else{
        this.router.navigate(['/login'], { queryParams: { redirectFrom: 'dashboard' } });
      }
    })
    .catch((error) => console.warn(error));
  }

}
