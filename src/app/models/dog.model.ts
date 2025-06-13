import {Veterinarian} from './veterinarian.model';
import {Enrollment} from './enrollment.model';

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

  enrollments: Enrollment[];

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
