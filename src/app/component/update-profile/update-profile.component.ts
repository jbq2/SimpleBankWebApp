import { UpdateProfileService } from './../../service/update-profile.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Update } from 'src/app/interface/update';
import { LoginService } from 'src/app/service/login.service';
import { Functions } from 'src/app/lib/functions';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  email: string = '';
  updateData: Update = {
    password: '',
    matching: ''
  };

  constructor(private functions: Functions, private router: Router, private updateProfileService: UpdateProfileService) { }

  ngOnInit(): void {
    
  }

  onSubmit() {
    this.updateProfileService.requestToUpdate(this.updateData);
  }

}
