export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  username: string;
  bio?: string;
  skills?: string[];
  location?: string;
  avatar?: string;
  role?: number;
  volunteer?: Volunteer;
  organization?: Organization;
  isLoggedIn?: boolean;
}

export interface Volunteer {
  phone: string;
  firstName: string;
  lastName: string;
  city: string;
  age: number;
  skills: skill[];
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

export interface skill {
  id: number;
  name: string;
}

export interface Author {
  id: string;
  name: string;
  avatar: string;
  type: "user" | "organization";
}

export interface Post {
  id: string;
  author: Author;
  title: string;
  content: string;
  skills: string[];
}

export enum Role {
  Volunteer = 0,
  Organization = 1
}
