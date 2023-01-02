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
    this.loginService.getTabs(localStorage.getItem("jwt")!).subscribe({
      next: (response) => { 
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