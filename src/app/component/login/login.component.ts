import { LoginService } from '../../service/login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Login } from 'src/app/interface/login';
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

  /**
   * Injects various objects into the local attributes of the LoginComponent class.
   * @param loginService Provides the method that calls the API to verify user login.
   * @param title Used for setting the browser tab name.
   * @param route Gathers URL query parameters if thera are any.
   * @param router Adds navigation from this component to another page.
   */
  constructor(private loginService: LoginService, private title: Title, private route: ActivatedRoute, private router: Router) {
    this.title.setTitle('Login | Blue Pig Bank');
  }

  /**
   * Resets the class attributes that are used for validation and message showing.  It also checks for query parameters in situations where
   * the user was redirected to the login page from a login-protected page.
   */
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

  /**
   * Called when the user submits the login form and verifies the form inputs.  If any inputs are invalid, the form is not sent to the API.
   * Otherwise, the form is sent to API which then goes through a second set of validations.
   */
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

    console.info('Your login information has been submitted');

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
          this.responseCode = 200;
          this.responseMessage = response.message;
          this.success = true;
          this.loginData.password = '';
          localStorage.setItem('jwt', response.jwt);
          this.router.navigate(['/dashboard'], { queryParams: {redirect: true} });
        },
        error: (e: HttpErrorResponse) => {
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
