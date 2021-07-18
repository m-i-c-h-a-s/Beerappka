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
}
