import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Login } from 'src/app/interface/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginData: Login = {
    email: '',
    password: ''
  }
  public valid: boolean = true;
  public errors: Map<string, boolean> = new Map<string, boolean>();

  constructor(private http: HttpClient, private title: Title) {
    this.title.setTitle('Login | Blue Pig Bank');
  }

  ngOnInit(): void { }

  onSubmit(): void {
    this.valid = true;
    this.errors.set('hasEmptyField', false);
    this.errors.set('hasInvalidEmail', false);
    this.errors.set('hasTooShortPassword', false);

    console.warn('Your login information has been submitted');

    let emailRegex: string = '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$';
    if(this.loginData.email.length == 0 || this.loginData.password.length == 0){
      this.valid = false;
      this.errors.set('hasEmptyField', true);
    }
    else{
      let regex: RegExp = new RegExp(emailRegex);
      if(!regex.test(this.loginData.email)){
        this.valid = false;
        this.errors.set('hasInvalidEmail', true);
      }

      if(this.loginData.password.length < 8){
        this.valid = false;
        this.errors.set('hasTooShortPassword', true);
      }
    }

    if(this.valid){
      console.warn('Valid form submission on front end');

      /* TODO: call api to verify login information */
    }
  }

}
