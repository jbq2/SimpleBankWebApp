import { Router, ActivatedRoute } from '@angular/router';
import { SignoutService } from './../../service/signout.service';
import { LoginService } from './../../service/login.service';
import { Component, OnInit } from '@angular/core';
import { Tab } from 'src/app/interface/tab';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  baseUrl: string = 'http://localhost:4200';
  tabs: Array<Tab> = [];

  constructor(private loginService: LoginService, private signoutService: SignoutService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    let jwt = (localStorage.getItem('jwt') == null) ? 'none' : localStorage.getItem('jwt')!;
    this.loginService.getTabs(jwt).subscribe({
      next: (response) => { 
        this.route.params.subscribe({
          next: (params) => {
            if(params['redirectFrom'] != 'signout') {
              this.tabs = response;
              console.log(response);
            }
          }
        });
      },
      error: () => {
        if(localStorage.length != 0){
          console.warn("Your session has expired");
        }
        localStorage.removeItem("jwt");
      },
      complete: () => { console.info("complete"); }
    })
  }

  signout() {
    let jwt = (localStorage.getItem("jwt") == null) ? '' : localStorage.getItem("jwt")!;
    this.signoutService.signout(jwt);
    localStorage.removeItem('jwt');
    this.router.navigate(['/login'], { queryParams: {redirectFrom: 'signout'} })
  }
}