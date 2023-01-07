import { Router, ActivatedRoute } from '@angular/router';
import { SignoutService } from './../../service/signout.service';
import { Pages } from '../../constant/pages';
import { LoginService } from './../../service/login.service';
import { Component, OnInit } from '@angular/core';
import { ListKeyManager } from '@angular/cdk/a11y';
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
    this.loginService.getTabs(localStorage.getItem("jwt")!).subscribe({
      next: (response) => { 
        this.route.params.subscribe({
          next: (params) => {
            if(params['redirectFrom'] != 'signout'){
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
    this.router.navigate(['/login'], { queryParams: {redirectFrom: 'signout'} })
  }
}