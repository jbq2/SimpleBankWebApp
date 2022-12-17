import { UpdateProfileService } from './../../service/update-profile.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Update } from 'src/app/interface/update';
import { LoginService } from 'src/app/service/login.service';

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

  constructor(private loginService: LoginService, private router: Router, private updateProfileService: UpdateProfileService) { }

  ngOnInit(): void {
    this.loginService.checkSessionStatus(localStorage.getItem("SESSION_ID")!)
    .then((isLoggedIn) => {
      if(isLoggedIn) {
        this.email = localStorage.getItem('EMAIL')!;
      }
      else {
        this.router.navigate(['/login'], { queryParams: { redirectFrom: 'update-profile' }});
      }
    })
  }

  onSubmit() {
    this.updateProfileService.requestToUpdate(this.updateData);
  }

}
