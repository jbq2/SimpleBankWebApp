import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Tab } from 'src/app/interface/tab';
import { BehaviorSubject } from 'rxjs';
import { NavbarProtoService } from 'src/app/service/navbar-proto.service';
import { SignoutService } from 'src/app/service/signout.service';

@Component({
  selector: 'app-navbar-proto',
  templateUrl: './navbar-proto.component.html',
  styleUrls: ['./navbar-proto.component.css']
})

export class NavbarProtoComponent implements OnInit {
  baseUrl: string = 'http://localhost:4200';

  tabs$!: BehaviorSubject<Tab[]>;

  constructor(private router: Router, private route: ActivatedRoute, private signoutService: SignoutService, private navbarProtoService: NavbarProtoService) { }

  /**
   * Initializes the class when a user enters a page that uses this component.  The tabs are gathered from the API.
   */
  ngOnInit() {
    this.tabs$ = this.navbarProtoService.getLinksSubject();
  }

  signout() {
    this.signoutService.signout();
    localStorage.removeItem('jwt');
    this.router.navigate(['/login'], { queryParams: {redirectFrom: 'signout'} });
  }
}