import {FavouriteBeerStyle} from './FavouriteBeerStyle';

export interface Profile {
  id: number;
  favourite_beer_style: Array<FavouriteBeerStyle>;
  birth_date: string;
  town: string;
  website: string;
  instagram: string;
  brewer_since: string;
  about_me: string;
  picture: string;
  user: number;
  picture_thumb_150x150: string;
}
