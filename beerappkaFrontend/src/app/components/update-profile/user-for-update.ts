import {ProfileForUpdate} from './profile-for-update';

export interface UserForUpdate {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  profile: ProfileForUpdate;
}
