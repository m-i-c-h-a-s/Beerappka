import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import {User} from '../profile/user';
import {UserForUpdate} from './user-for-update';
import {BeerStylesService} from '../services/beer-styles.service';
import {FavouriteBeerStyle} from '../profile/FavouriteBeerStyle';


@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.sass']
})
export class UpdateProfileComponent implements OnInit {
  public currentUser: User | undefined;
  private userForUpdate: UserForUpdate | undefined;
  public file: File | undefined;
  public beerStyles: Array<FavouriteBeerStyle> | undefined;
  public favBeerStyles: Array<number> = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private beerStylesService: BeerStylesService
  ) { }

  ngOnInit(): void {
    this.userService.getCurrentUserData().subscribe(data => {
      this.currentUser = data as any;
      this.favBeerStyles = this.currentUser?.profile.favourite_beer_style.map(obj => obj.id) || [];
    }, err => {
      console.log(err);
    });
    this.beerStylesService.getAllBeerStyles().subscribe(data => {
      this.beerStyles = data as any;
    }, err => {
      console.log(err);
    });
  }

  onSubmit(): void {
    this.setUserForUpdate();
    this.userService.updateUser(this.userForUpdate).subscribe(data => {
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
      if (this.currentUser) {
        this.currentUser.profile.picture = data.picture;
      }
    }, err => {
      console.log(err);
    });
  }

  private setUserForUpdate(): void {
    if (this.currentUser) {
      this.userForUpdate = {
        username: this.currentUser.username,
        first_name: this.currentUser.first_name,
        last_name: this.currentUser.last_name,
        email: this.currentUser.email,
        profile: {
          birth_date: this.currentUser.profile.birth_date,
          town: this.currentUser.profile.town,
          website: this.currentUser.profile.website,
          instagram: this.currentUser.profile.instagram,
          brewer_since: this.currentUser.profile.brewer_since,
          about_me: this.currentUser.profile.about_me,
          favourite_beer_style: this.favBeerStyles
        }
      };
    }
  }

  isFavouriteBeerStyle(beerStyle: FavouriteBeerStyle): boolean | undefined {
    return this.currentUser?.profile.favourite_beer_style.some(obj => obj.id === beerStyle.id);
  }

}
