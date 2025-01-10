export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  bio: string;
  skills: string[];
  location: string;
  avatar: string;
  role?: number;
  volunteer?: Volunteer;
  organization?: Organization;
}

export interface Volunteer {
  phone: string;
  firstName: string;
  lastName: string;
  city: string;
  age: number;
  occupations: Occupation[];
  imageUrl: string;
  about: string;
}

export interface Organization {
  id: string;
  city: number;
  name: string;
  description: string;
  imageUrl: string;
}

export interface Occupation {
  id: number;
  name: string;
}

export enum Role {
  Volunteer = 0,
  Organization = 1,
}
