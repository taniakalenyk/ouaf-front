import {Dog} from './dog.model';

export interface Owner {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  photoId?: string;
  phoneNumber?: string;
  address?: string;
  about?: string;
  birthdate?: string;
  city?: string;
  postcode?: string;
  dogs?: Dog[];
}
