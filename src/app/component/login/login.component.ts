import { LoginService } from './../../service/login.service';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
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
  public responseCode: number = 0;

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
    this.responseCode = 0;

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
      this.loginService.loginUser(this.loginData).subscribe({
        next: (response) => {
          console.log(response.session_id);
          this.responseCode = 200;
          this.responseMessage = response.message;
          this.success = true;
          this.loginData.password = '';
        },
        error: (e: HttpErrorResponse) => {
          this.responseCode = e.status;
          this.responseMessage = (this.responseCode == 401) ? 'Incorrect credentials.' : e.error;
          this.loginData.password = '';
        },
        complete: () => console.info('complete')
      }
      // (response: Map<string, string>) => {
      //   this.responseCode = 200;
      //   this.responseMessage = 'Successfully logged in.';
      //   console.log(response);
      //   // TODO: save sessionId to cookie
      //   this.success = true;
      // },
      // (error: HttpErrorResponse) => {
      //   this.responseCode = error.status;
      //   if(this.responseCode >= 500){
      //     this.responseMessage = 'You are already logged in.';
      //   }
      //   else{
      //     this.responseMessage = 'Incorrect credentials.';
      //   }
      // }
      );

    }
  }

}
