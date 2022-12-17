import { LoginService } from '../../service/login.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Login } from 'src/app/interface/login';
import { Functions } from 'src/app/lib/functions';
import { ActivatedRoute, Router } from '@angular/router';

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
  public redirectedFromSignout: boolean = false;

  constructor(private http: HttpClient, private loginService: LoginService, private title: Title, private route: ActivatedRoute, private router: Router) {
    this.title.setTitle('Login | Blue Pig Bank');
  }

  ngOnInit(): void {
    this.valid = true;
    this.success = false;
    this.apiError = false;
    this.responseMessage = '';
    this.errors.set('hasEmptyField', false);
    this.errors.set('hasInvalidEmail', false);
    this.errors.set('hasTooShortPassword', false);
    this.responseCode = 0;
    this.redirectedFromSignout = false;
    this.route.queryParams.subscribe(params => {
      if(params['redirectFrom'] == 'signout') {
        this.redirectedFromSignout = true;
      }
      else if(params['redirectFrom'] != null) {
        this.errors.set('redirectError', true);
      }
      else{
        this.errors.set('redirectError', false);
      }
    });
  }

  onSubmit(): void {
    this.valid = true;
    this.success = false;
    this.apiError = false;
    this.responseMessage = '';
    this.errors.set('hasEmptyField', false);
    this.errors.set('hasInvalidEmail', false);
    this.errors.set('hasTooShortPassword', false);
    this.errors.set('redirectError', false);
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
          /**
           * the next clause for this observable handles a successful login attempt
           * it displays a success message and then sets the SESSION_ID and AUTHORITIES in localStorage
           * TODO: response message shouldn't really be shown--what should happen is that the user is redirected to a logged in home page
           */
          this.responseCode = 200;
          this.responseMessage = response.message;
          this.success = true;
          this.loginData.password = '';
          localStorage.setItem('SESSION_ID', response.session_id);
          localStorage.setItem('AUTHORITIES', JSON.stringify(response.authorities));
          localStorage.setItem('EMAIL', response.email);
          this.router.navigate(['/dashboard'], { queryParams: {redirect: true} });
        },
        error: (e: HttpErrorResponse) => {
          /**
           * an error is caught upon receiving a non 200 response code
           * if the error code is 401, the insufficient credentials were given
           * the password field is cleared as a result for the user to try again
           */
          this.responseCode = e.status;
          this.responseMessage = (this.responseCode == 401) ? 'Incorrect credentials.' : e.error;
          this.loginData.password = '';
        },
        complete: () => {
          console.info('complete');
        }
      });
    }
  }

}
