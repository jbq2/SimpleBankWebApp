import { CustomResponse } from './../../interface/response';
import { LoginService } from './../../service/login.service';
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
  public success: boolean = false;
  public apiError: boolean = false;
  public errors: Map<string, boolean> = new Map<string, boolean>();
  public responseMessage: string = '';

  constructor(private http: HttpClient, private loginService: LoginService, private title: Title) {
    this.title.setTitle('Login | Blue Pig Bank');
  }

  ngOnInit(): void { }

  onSubmit(): void {
    this.valid = true;
    this.success = false;
    this.apiError = false;
    this.responseMessage = '';
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

      this.loginService.loginUser(this.loginData).subscribe((response: CustomResponse) =>{
        this.responseMessage = response.message;
        if(this.responseMessage == 'SUCCESS'){
          this.success = true;
          response.body = new Map(Object.entries(response.body));
          localStorage.setItem(response.body.get('loginEmail')!, response.body.get('userDetails')!);
          console.log(response.body);
          /* TODO: redirect to some other page */
        }
        else{
          this.apiError = true;
          if(this.responseMessage.length == 0){
            this.responseMessage = 'API could not process your request.'
          }
        }
      });
    }
  }

}
