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

export interface Tag {
  type: tagType;
  text: FocusArea | Skill;
  bgColor: string;
  textColor: string;
}

export interface GeneralCardProps {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  tags: Tag[];
  linkText?: string;
  linkUrl?: string;
  additionalInfo?: string;
}

export interface Post {
  id: string;
  author: Author;
  title: string;
  content: string;
  skills: Skill[] | FocusArea[];
  comments: Comment[];
  likes: number;
}

export interface Comment {
  id: string;
  author: Author;
  content: string;
  createdAt: string;
  likes: number;
}

export enum Role {
  Volunteer = 0,
  Organization = 1
}

export enum tagType {
  skill = "skill",
  focusArea = "focus-area"
}

export interface ProfileData {
  name: string;
  email: string;
  role: Role;
  imageUrl?: string;
  city: string;
  skills?: Skill[];
  username: string;
  about?: string;
}

export interface AiDescription {
  description: string;
}

type GeneralResponse = {
  user: User;
  accessToken: string;
  refreshToken: string;
};

export type RefreshResponse = {
  accessToken: string;
  refreshToken: string;
};

export type SigninResponse = GeneralResponse;

export type GoogleSignInResponse = GeneralResponse;

export type SignupResponse = GeneralResponse;
