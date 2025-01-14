export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  role?: Role;
  volunteer?: Volunteer;
  organization?: Organization;
  isLoggedIn?: boolean;
}

export interface Volunteer {
  userId: string;
  firstName: string;
  lastName: string;
  phone?: string;
  city?: string;
  age?: number;
  skills?: Skill[];
  imageUrl?: string;
  about?: string;
}

export type SimpleVolunteer = Omit<Volunteer, "skills"> & {
  skills: string[];
};

export interface Organization {
  userId: string;
  city: string;
  name: string;
  description: string;
  imageUrl?: string;
  focusAreas: FocusArea[];
  websiteLink: string;
}

export type SimpleOrganization = Omit<Organization, "focusAreas"> & {
  focusAreas: string[];
};

export type PaginationSimpleOrganization = {
  organizations: SimpleOrganization[];
  pages: number;
};

export type PaginationSimpleVolunteer = {
  volunteers: SimpleVolunteer[];
  pages: number;
};

export interface IdName {
  _id: string;
  name: string;
}

export type Skill = IdName;
export type FocusArea = IdName;
export type City = IdName;

export interface Author {
  _id: string;
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
  name: string;
  imageUrl?: string;
  description: string;
  tags: Tag[];
  linkText?: string;
  linkUrl?: string;
  additionalInfo?: string;
}

export interface Post {
  _id: string;
  author: Author;
  title: string;
  content: string;
  skills: Skill[] | FocusArea[];
  comments: Comment[];
  likes: number;
}

export interface Comment {
  _id: string;
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
  city?: string;
  skills?: Skill[];
  username: string;
  about?: string;
}

export interface Message {
  _id: string;
  content: string;
  sender: User;
  timestamp: Date;
}

export interface ChatProps {
  currentUser: User;
  selectedUser: User | null;
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

export type SignupResponse = User;

export type CreateVolunteerResponse = SimpleVolunteer;

export type CreateOrganizationResponse = SimpleOrganization;

export type GetIdNameResponse = IdName[];
