import { Registration } from './../../interface/registration';
import { RegistrationService } from './../../service/registration.service';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationData: Registration = {
    email: '',
    password: '',
    matching: ''
  };

  constructor(private registrationService: RegistrationService, private formBuilder: FormBuilder) { }

  ngOnInit(): void { }

  onSubmit(): void {
    console.warn('Your registration information has been submitted');
    console.log(this.registrationData.email);
    console.log(this.registrationData.password);
    console.log(this.registrationData.matching);

    let valid: boolean = true;
    /* TODO: validate the inputs in typescript */
    /* TODO: if invalid, post flash message saying was exactly went wrong */
    /* TODO: if valid, proceed send registrationData to api */
  }

}
