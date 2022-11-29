import { RegistrationResponse } from './../../interface/registration-response';
import { Title } from '@angular/platform-browser';
import { Registration } from './../../interface/registration';
import { RegistrationService } from './../../service/registration.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  /* registration interface initialization */
  public registrationData: Registration = {
    email: '',
    password: '',
    matching: ''
  };
  /* marks if form submission was valid */
  public valid: boolean = true;
  public success: boolean = false;
  public showMessages: boolean = true;
  /* map of booleans for describing what exactly went wrong */
  public errors: Map<string, boolean> = new Map<string, boolean>();
  public responseMessage: string = '';
  public responseCode: number = 0;

  /* registration service will be used to send req to api */
  constructor(private registrationService: RegistrationService, private title: Title) {
    this.title.setTitle('Register | Blue Pig Bank')
  }

  ngOnInit(): void { }

  onSubmit(): void {
    /* reset marking class level attributes to their initial values */
    this.valid = true;
    this.success = false;
    this.showMessages = false;
    this.errors.set('hasEmptyField', false);
    this.errors.set('hasInvalidEmail', false);
    this.errors.set('hasTooShortPassword', false);
    this.errors.set('hasInvalidPassword', false);
    this.errors.set('hasNonMatchingPassword', false);
    this.responseMessage = '';
    this.responseCode = 0;

    console.info('Your registration information has been submitted');

    let emailRegex: string = '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$';
    let passwordRegex: string = '^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$';
    
    if(this.registrationData.email.length == 0 || this.registrationData.password.length == 0 || this.registrationData.matching.length == 0){
      this.valid = false;
      this.errors.set('hasEmptyField', true);
    }
    else{
      let regex: RegExp = new RegExp(emailRegex);
      if(!regex.test(this.registrationData.email)){
        this.valid = false;
        this.errors.set('hasInvalidEmail', true);
      }
  
      regex = new RegExp(passwordRegex);
      if(this.registrationData.password.length < 8){
        this.valid = false;
        this.errors.set('hasTooShortPassword', true);
      }
      if(!regex.test(this.registrationData.password)){
        this.valid = false;
        this.errors.set('hasInvalidPassword', true);
      }
  
      if(this.registrationData.password != this.registrationData.matching){
        this.valid = false;
        this.errors.set('hasNonMatchingPassword', true);
      }
    }

    console.log(this.errors);

    if(this.valid){
      console.info('Valid form submission on front end');
      this.registrationService.registerUser(this.registrationData).subscribe({
        next: (response) => {
          console.log(response.email);
          this.responseCode = 200;
          this.responseMessage = response.message;
          this.success = true;
          this.registrationData.password = '';
          this.registrationData.matching = '';
        },
        error: (e: HttpErrorResponse) => {
          console.log(e.error);
          this.responseCode = e.status;
          this.responseMessage = e.error;
        },
        complete: () => console.info('complete')
      }
      // (response: Map<string, string>) => {
      //   this.responseCode = 200;
      //   this.responseMessage = 'Succesfully registered.';
      //   console.log(response);
      //   this.success = true;
      // },
      // (error: HttpErrorResponse) => {
      //   this.responseCode = error.status;
      //   if(this.responseCode >= 500){
      //     this.responseMessage = 'Email already exists.';
      //   }
      //   else{
      //     this.responseMessage = 'Invalid registration information.';
      //   }
      //   console.log(error);
      // }
      );
    }
    else{
      console.warn('Invalid form submission');
    }

    this.showMessages = true;
  }

}