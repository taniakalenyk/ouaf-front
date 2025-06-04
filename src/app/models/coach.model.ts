import {User} from './user.model';

export interface Coach extends User {
  phoneNumber?: string;
  address?: string;
  about?: string;
  birthdate?: string;
  city?: string;
  postcode?: string;
}
