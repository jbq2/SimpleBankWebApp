import { ApiLink } from './../../constant/api-link';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  baseUrl: string = 'http://localhost:4200';

  constructor() { }

  ngOnInit(): void {
  }

}
