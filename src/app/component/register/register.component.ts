import { Registration } from './../../interface/registration';
import { RegistrationService } from './../../service/registration.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  /* registration interface initialization */
  registrationData: Registration = {
    email: '',
    password: '',
    matching: ''
  };

  /* registration service will be used to send req to api */
  constructor(private registrationService: RegistrationService) { }

  ngOnInit(): void { }

  onSubmit(): void {
    console.warn('Your registration information has been submitted');
    /*
    console.log(this.registrationData.email);
    console.log(this.registrationData.password);
    console.log(this.registrationData.matching);
    */

    let valid: boolean = true;
    let emailRegex: string = '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$';
    let passwordRegex: string = '^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$';
    
    /* TODO: if invalid, post flash message saying was exactly went wrong */
    let regex: RegExp = new RegExp(emailRegex);
    if(this.registrationData.email.length == 0){
      valid = false;
      console.warn('Email field must not be empty');
    }
    else{
      if(!regex.test(this.registrationData.email)){
        valid = false;
        console.warn('Entered email is invalid');
      }
    }
    
    regex = new RegExp(passwordRegex);
    if(this.registrationData.password.length == 0){
      valid = false;
      console.warn('Password field must not be empty');
    }
    else{
      if(this.registrationData.password.length < 8){
        valid = false;
        console.warn('Entered password is too short (must have >= 8 characters)');
      }
      if(!regex.test(this.registrationData.password)){
        valid = false;
        console.warn('Entered password is invalid (atleast 1 letter, 1 special character, 1 digit)');
      }
    }

    if(this.registrationData.matching.length == 0){
      valid = false;
      console.warn('Password confirmation field must not be empty');
    }
    else{
      if(this.registrationData.password != this.registrationData.matching){
        valid = false;
        console.warn('Entered password confirmation does not match entered password');
      }
    }

    if(valid){
      /* TODO: if valid, proceed send registrationData to api */
      console.warn('Valid form submission');
    }
    else{
      console.warn('Invalid form submission');
    }
  }

}
