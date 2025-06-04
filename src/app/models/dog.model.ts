//TODO add fields to dog model

import {Veterinarian} from './veterinarian.model';

export interface Dog {
  dogId: number;
  name: string;
  gender: boolean | null; // true = female, false = male, null
  birthDate: string; // ISO string, ex. "2024-04-15"
  photoId: string | null;
  weight: number | null;
  notes: string | null;
  registrationDate: string;
  sterilized: boolean;

  // enrollments: Enrollment[];

  // owner: {
  //   userId: number;
  //   firstName: string;
  //   lastName: string;
  // };

  primaryBreed: {
    breedId: number;
    breedName: string;
  };

  secondaryBreed: {
    breedId: number;
    breedName: string;
  };
  veterinarian: Veterinarian;
}
