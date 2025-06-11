export interface Enrollment {
  enrollmentId: number;
  dateCreation: string;
  paymentDate: string | null;
  dog: {
    dogId: number;
    name: string;
    birthDate: string;
  };
  lesson: {
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
      type: {
        typeAppointment: string;
      };
    };
  };
  enrollmentCancellationReason: {
    enrollmentCancellationId: number;
    reason: string;
  } | null;
}
