export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    photoId?: string;
    registrationDate: string;
    verificationEmailToken?: string;
    role?: string;
}
