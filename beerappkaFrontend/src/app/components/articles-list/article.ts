import {User} from '../../profile/user';

export interface Article {
  id: number;
  title: string;
  content: string;
  creation_date: string;
  last_modification_date: string;
  is_published: boolean;
  author: User;
}
