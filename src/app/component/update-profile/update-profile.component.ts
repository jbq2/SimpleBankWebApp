import { UpdateProfileService } from './../../service/update-profile.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Update } from 'src/app/interface/update';
import { Functions } from 'src/app/lib/functions';
import { InputRegex } from 'src/app/constant/input-regex';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})

export class UpdateProfileComponent implements OnInit {
  public currEmail: string = '';
  public updateData: Update = {
    email: '',
    oldEmail: '',
    oldPassword: '',
    password: '',
    matching: '',
    jwt: localStorage.getItem('jwt')!
  };
  public valid: boolean = true;
  public errors: Map<string, boolean> = new Map<string, boolean>();
  public success: boolean = false;
  public responseCode: number = 0;
  public responseMessage: string = '';

  /**
   * Injects objects to the private attributes of the UpdateProfileComponent Object and sets the browser tab name.
   * @param functions Contains useful function for checking login status that communicate with a matching class in the API.
   * @param updateProfileService Provides method to send the update profile form to the API for validation and processing.
   * @param router Adds navigation from this component to another page.
   * @param title Used for setting the browser tab name.
   */
  constructor(private functions: Functions,private updateProfileService: UpdateProfileService, private router: Router, private title: Title) {
    this.title.setTitle('Profile | Blue Pig Bank');
  }

  /**
   * Resets the attributes that are required for validation and showing messages to the client.  This also checks if the user
   * is logged in, and if so, permits them to explore the page.  Otherwise, the user will be redirected to the login page
   * with a message.
   */
  ngOnInit(): void {
    this.valid = true;
    this.success = false;
    this.responseCode = 0;
    this.responseMessage = '';
    this.errors.set('hasEmptyField', false);
    this.errors.set('hasInvalidEmail', false);
    this.errors.set('hasTooShortPassword', false);
    this.errors.set('hasInvalidPassword',false);
    this.errors.set('hasNonMatchingPassword', false);

    let jwt = (localStorage.getItem('jwt') == null) ? 'none' : localStorage.getItem('jwt')!;
    this.functions.isLoggedIn(jwt).then((response) => {
      console.log(response);
      if(response.loggedIn) {
        this.updateProfileService.getPageContent(jwt).subscribe({
          next: (email) => {
            this.currEmail = email;
            this.updateData.oldEmail = this.currEmail;
          },
          error: (error) => {
            console.warn(error);
            this.router.navigate(['/login'], { queryParams: { redirectFrom: 'profile' } });
          },
          complete: () => { console.log('complete') }
        }); 
      }
      else {
        this.router.navigate(['/login'], { queryParams: { redirectFrom: 'profile' } });
      }
    }).catch((error) => {
      console.warn(error);
      this.router.navigate(['/login'], { queryParams: { redirectFrom: 'profile' } });
    });;
  }

  /**
   * Called when the user submits a request to update their profile.  The function performs a set of validations and if the inputs are
   * valid, the form will be sent to the API for a second set of validations.  If the form passes the API validations, the user's profile
   * will be updated.
   */
  onSubmit() {
    this.valid = true;
    this.success = false;
    this.responseCode = 0;
    this.responseMessage = '';
    this.errors.set('hasEmptyField', false);
    this.errors.set('hasInvalidEmail', false);
    this.errors.set('hasTooShortOldPassword', false);
    this.errors.set('hasTooShortPassword', false);
    this.errors.set('hasInvalidPassword',false);
    this.errors.set('hasNonMatchingPassword', false);

    console.info('Your new account information has been submitted');

    let emailRegex: string = InputRegex.emailRegex;
    let passwordRegex: string = InputRegex.passwordRegex;

    if(this.updateData.email.length == 0 || this.updateData.oldPassword.length == 0 || this.updateData.password.length == 0 || this.updateData.matching.length == 0) {
      this.valid = false;
      this.errors.set('hasEmptyField', true);
    }
    else{
      let regex: RegExp = new RegExp(emailRegex);
      if(!regex.test(this.updateData.email)) {
        this.valid = false;
        this.errors.set('hasInvalidEmail', true);
      }

      if(this.updateData.oldPassword.length < 8) {
        this.valid = false;
        this.errors.set('hasTooShortOldPassword', true);
      }
      if(this.updateData.password.length < 8) {
        this.valid = false;
        this.errors.set('hasTooShortPassword', true);
      }

      regex = new RegExp(passwordRegex);
      if(!regex.test(this.updateData.password)) {
        this.valid = false;
        this.errors.set('hasInvalidPassword', true);
      }
      if(this.updateData.password != this.updateData.matching) {
        this.valid = false;
        this.errors.set('hasNonMatchingPassword', true);
      }
    }
    
    if(this.valid) {
      console.info('Valid form submission on front end');
      let jwt = (localStorage.getItem('jwt') == null) ? 'none' : localStorage.getItem('jwt')!;
      this.updateProfileService.requestToUpdate(jwt, this.updateData).subscribe({
        next: (response) => {
          this.success = true;
          this.responseCode = 200;
          this.responseMessage = response.message;
          this.currEmail = response.email;
          localStorage.setItem('jwt', response.jwt);
        },
        error: (e) => {
          console.log(e.error.jwt);
          this.responseMessage = e.error.message;
          this.responseCode = e.status;
          localStorage.setItem('jwt', e.error.jwt);
        },
        complete: () => console.info('complete')
      });
    }
    else {
      console.warn('Invalid form submission');
    }
  }

}
