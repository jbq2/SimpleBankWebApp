import { RegistrationService } from './../../service/registration.service';
import { FormBuilder } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = this.formBuilder.group({
    email: '',
    password: '',
    matching: ''
  }); 

  // private registrationService: RegistrationService, private formBuilder: FormBuilder
  constructor(private registrationService: RegistrationService, private formBuilder: FormBuilder) { }

  ngOnInit(): void { }

  onSubmit(): void {
    console.warn('Your registration information has been submitted');
    /* this will have more stuff in it, like calling the api */
  }

}
