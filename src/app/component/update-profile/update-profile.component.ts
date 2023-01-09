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

  constructor(private updateProfileService: UpdateProfileService) { }

  ngOnInit(): void {
    let jwt = (localStorage.getItem('jwt') == null) ? 'none' : localStorage.getItem('jwt')!;
    this.updateProfileService.getPageContent(jwt).subscribe({
      next: (response) => {console.info(response)},
      error: (error) => {console.warn(error)},
      complete: () => {console.log('complete')}
    });
  }

  onSubmit() {
    this.updateProfileService.requestToUpdate(this.updateData);
  }

}
