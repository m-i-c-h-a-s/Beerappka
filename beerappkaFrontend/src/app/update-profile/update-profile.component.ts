import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.sass']
})
export class UpdateProfileComponent implements OnInit {
  public currentUser: any;
  public file: File | undefined;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getCurrentUserData().subscribe(data => {
      this.currentUser = data;
    }, err => {
      console.log(err);
    });
  }

  onSubmit(): void {
    this.userService.updateUser(this.currentUser).subscribe(data => {
      return this.router.navigate(['profil']);
    }, err => {
      console.log(err);
    });
  }

  onFileSelected(event: any): void {
    this.file = event.target.files[0];
  }

  updateProfilePicture(): void {
    if (!this.file) { return; }
    const formData = new FormData();
    formData.append('picture', this.file);
    this.userService.updateProfilePicture(formData).subscribe(data => {
      this.file = undefined;
      this.currentUser.profile.picture = data.picture;
    }, err => {
      console.log(err);
    });
  }

}
