export interface Lesson {
  lessonId: number;
  startDateTime: string;
  endDateTime: string;
  location: string;
  lessonCancellationReason: string | null;
  coach: {
    userId: number;
    firstName: string;
    lastName: string;
    role: string;
  };
  template: {
    capacity: number;
    minAge?: number;  // Minimum age in months for dogs
    maxAge?: number;  // Maximum age in months for dogs
    type: {
      typeAppointment: string;
    };
  };
}
