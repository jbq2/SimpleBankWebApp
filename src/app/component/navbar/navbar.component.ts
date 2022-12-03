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
    ['Register', `${this.baseUrl}/register`],
    ['Login', `${this.baseUrl}/login`]
  ]);

  constructor(private loginService: LoginService) { }

  ngOnInit(): void { 
    let sessionId = localStorage.getItem('SESSION_ID');
    if(this.loginService.isLoggedIn(sessionId)) {
      // it is implied that localStorage will have AUTHORITIES if isLoggedIn
      let authorities: Array<string> = JSON.parse(localStorage.getItem('AUTHORITIES')!);
      if(authorities.includes('ADMIN')){
        this.tabs = new Map([
          ['Accounts', `#`],
          ['Profile', `#`],
          ['Admin', `#`],
          ['Logout', `#`]
        ]);
      }
      else if(authorities.includes('USER')){
        this.tabs = new Map([
          ['Accounts', `#`],
          ['Profile', `#`],
          ['Logout', `#`]
        ]);
      }
    }
  }
}
