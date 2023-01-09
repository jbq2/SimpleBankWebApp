import { UpdateProfileService } from './../../service/update-profile.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Update } from 'src/app/interface/update';
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

  constructor(private functions: Functions,private updateProfileService: UpdateProfileService, private router: Router) { }

  ngOnInit(): void {
    let jwt = (localStorage.getItem('jwt') == null) ? 'none' : localStorage.getItem('jwt')!;
    this.functions.isLoggedIn(jwt).then((response) => {
      console.log(response);
      if(response.loggedIn) {
        this.updateProfileService.getPageContent(jwt).subscribe({
          next: (email) => {
            console.info(email);
            this.email = email;
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
    });
  }

  onSubmit() {
    this.updateProfileService.requestToUpdate(this.updateData);
  }

}
