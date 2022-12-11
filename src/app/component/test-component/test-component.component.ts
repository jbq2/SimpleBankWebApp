import { LoginService } from './../../service/login.service';
import { Component, OnInit } from '@angular/core';

/**
 * this is only a TEST COMPONENT for testing purposes
 */

@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.css']
})
export class TestComponentComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    console.info('test log');
    this.loginService.checkSessionStatus(localStorage.getItem("SESSION_ID")!)
    .then((isLoggedIn) => {
      if(isLoggedIn){
        console.info("Session exists! You are logged in!");
      }
      else{
        console.warn("No session exists! You are NOT logged in!");
      }
    })
    .catch((error) => {
      console.warn("error occurred");
      console.warn(error);
    });
  }

}
