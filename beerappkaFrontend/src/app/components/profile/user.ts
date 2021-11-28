import {Profile} from './profile';

export interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  is_active: boolean;
  date_joined: string;
  last_login: string;
  profile: Profile;
  number_of_recipes: number;
  number_of_batches: number;
  last_recipe_name: string;
  last_batch_name: string;
}
