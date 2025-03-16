export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  role: Role;
  volunteer?: Volunteer;
  organization?: Organization;
  isLoggedIn?: boolean;
}

export interface Volunteer {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  phone?: string;
  city?: string;
  skills?: Skill[];
  imageUrl?: string;
  about?: string;
}

export type SimpleVolunteer = Omit<Volunteer, "skills"> & {
  skills: string[];
};

export interface Organization {
  _id: string;
  userId: string;
  city: string;
  name: string;
  description: string;
  focusAreas: FocusArea[];
  websiteLink: string;
  imageUrl?: string;
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
  type: "volunteer" | "organization";
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
  userId: string;
}

export interface Post {
  _id: string;
  author: User;
  title: string;
  content: string;
  imageUrl: string;
  skills: Skill[] | FocusArea[];
  comments: Comment[];
  likes: string[];
}

export interface reqApiPost {
  _id?: string;
  user: string;
  title: string;
  content: string;
  skills: string[];
  imageUrl: string;
}

export interface reqApiOrganization {
  _id: string;
  name?: string;
  city?: string;
  description?: string;
  email?: string;
  imageUrl?: string;
}

export interface reqApiVolunteer {
  _id: string;
  firstname?: string;
  city?: string;
  about?: string;
  email?: string;
  imageUrl?: string;
}

export interface reqApiUser {
  _id: string;
  username?: string;
}

export interface ApiPost {
  _id: string;
  user: User;
  title: string;
  content: string;
  skills: string[];
  likes: string[];
  comments: Comment[];
  imageUrl: string;
}

export interface ApiComment {
  _id: string;
  user: string;
  post: string;
  text: string;
  date: string;
  likes: number;
}

export interface Comment {
  _id: string;
  user: User;
  text: string;
  date: string;
  likes: string[];
}

export enum Role {
  Volunteer = 0,
  Organization = 1,
}

export enum tagType {
  skill = "skill",
  focusArea = "focus-area",
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
  createdAt: Date;
}

export interface ChatProps {
  currentUser: User;
  selectedUser: User | null;
  conversationId: string;
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

export type ImageUploadResponse = {
  originalName: string;
  serverFilename: string;
};

export interface Chat {
  _id: string;
  users: User[];
}

interface ApiChatUser {
  _id: string;
  username: string;
  role: Role;
}
export interface ApiChat {
  _id: string;
  users: ApiChatUser[];
}

export type ReceiveNewMessageResponse = {
  conversationId: Chat["_id"];
  sender: ApiChatUser;
} & Pick<Message, "_id" | "content" | "createdAt">;

export type SigninResponse = GeneralResponse;

export type GoogleSignInResponse = GeneralResponse;

export type SignupResponse = User;

export type CreateVolunteerResponse = SimpleVolunteer;

export type CreateOrganizationResponse = SimpleOrganization;

export type GetIdNameResponse = IdName[];

export type SendNewMessageInput = {
  conversationId: Chat["_id"];
  content: string;
};

export type ServerToClientEvents = {
  receiveMessage: (data: ReceiveNewMessageResponse) => void;
};

export type ClientToServerEvents = {
  joinRoom: (roomId: string) => void;
  sendMessage: (data: SendNewMessageInput) => void;
};

export type SendMessageInput = Pick<Message, "content"> & {
  userId: User["_id"];
  conversationId: Chat["_id"];
};
