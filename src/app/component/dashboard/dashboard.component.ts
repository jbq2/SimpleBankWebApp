import { LoginService } from './../../service/login.service';
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
  jwt: string = '';

  constructor(private functions: Functions, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.functions.isLoggedIn(localStorage.getItem("jwt")!).then((response) => {
      console.log(response);
      if(response.loggedIn) {
        this.route.queryParams.subscribe({
          next: (params) => {
            this.redirectedFromLogin = params['redirect'] != null;
            console.log(this.redirectedFromLogin);
          }
        })
        console.info("logged in");
        this.loggedIn = true;
        this.jwt = response.updatedJwt;
        localStorage.setItem("jwt", response.updatedJwt);
      }
      else {
        this.router.navigate(['/login'], { queryParams: { redirectFrom: 'dashboard' } })
      }
    }).catch((error) => console.warn(error));
  }

}
