import { Registration } from './../../interface/registration';
import { RegistrationService } from './../../service/registration.service';
import { Component, OnInit } from '@angular/core';
import { CustomResponse } from 'src/app/interface/response';

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
  /* map of booleans for describing what exactly went wrong */
  public errors: Map<string, boolean> = new Map<string, boolean>();
  public responseMessage: string = '';


  /* registration service will be used to send req to api */
  constructor(private registrationService: RegistrationService) { }

  ngOnInit(): void { }

  onSubmit(): void {
    /* reset marking class level attributes to their initial values */
    this.valid = true;
    this.success = false;
    this.errors.set('hasEmptyField', false);
    this.errors.set('hasInvalidEmail', false);
    this.errors.set('hasTooShortPassword', false);
    this.errors.set('hasInvalidPassword', false);
    this.errors.set('hasNonMatchingPassword', false);
    this.responseMessage = '';

    console.warn('Your registration information has been submitted');

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
      console.warn('Valid form submission');

      this.registrationService.registerUser(this.registrationData).subscribe((response: CustomResponse) => {
        if(response.responseType == 'SUCCESS'){
          this.success = true;
        }
        else{
          console.warn(`API failed to register user because of response message:[ ${response.message} ]`);
          if(response.message.length == 0){ 
            this.responseMessage = 'Fatal API error.';
          }
          else{
            this.responseMessage = response.message;
          }
        }
      });

      this.registrationData.matching = '';
      this.registrationData.password = '';
    }
    else{
      console.warn('Invalid form submission');
    }
  }

}