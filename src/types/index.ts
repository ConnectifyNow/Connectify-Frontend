export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  role?: Role;
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
  skills: Skill[];
  imageUrl?: string;
  about: string;
  userId: string;
}

export interface Organization {
  id: string;
  city: string;
  name: string;
  description: string;
  imageUrl?: string;

  // TODO: add to erd
  focusAreas: FocusArea[];
  websiteLink: string;
}

export interface Skill {
  id: number;
  name: string;
}

export interface FocusArea {
  id: number;
  name: string;
}

export interface Author {
  id: string;
  name: string;
  avatar?: string;
  type: "user" | "organization";
}

export interface Post {
  id: string;
  author: Author;
  title: string;
  content: string;
  skills: Skill[];
}

export enum Role {
  Volunteer = 0,
  Organization = 1
}

export interface ProfileData {
  name: string;
  email: string;
  role: Role;
  imageUrl?: string;
  city: string;
  skills?: Skill[];
  about?: string;
}
