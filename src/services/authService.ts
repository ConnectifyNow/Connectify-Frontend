import { CredentialResponse } from "@react-oauth/google";
import { AxiosResponse } from "axios";
import { User } from "../types/index";
import apiClient from "./apiClient";

const ACCESS_TOKEN_KEY = "access-token";
const REFRESH_TOKEN_KEY = "refresh-token";

export const headers = () => {
  const tokens = getTokens();
  if (tokens.accessToken) {
    return {
      Authorization: `Bearer ${tokens.accessToken}`,
    };
  }
  return {};
};

export const refreshTokenHeaders = () => {
  const tokens = getTokens();
  if (tokens.refreshToken) {
    return {
      Authorization: `Bearer ${tokens.refreshToken}`,
    };
  }
  return {};
};

export const getTokens = () => {
  return {
    accessToken: localStorage.getItem(ACCESS_TOKEN_KEY),
    refreshToken: localStorage.getItem(REFRESH_TOKEN_KEY),
  };
};

export const saveTokens = ({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

export const resetTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

type SigninResponse = {
  user: User;
  accessToken: string;
  refreshToken: string;
};
export const signin = async (
  email: string,
  password: string
): Promise<AxiosResponse<SigninResponse>> => {
  return await apiClient.post("/auth/signin", { email, password });
};

export const logout = async () => {
  return await apiClient.post(
    "/auth/logout",
    {},
    { headers: refreshTokenHeaders() }
  );
};

type SignupResponse = {
  user: User;
  accessToken: string;
  refreshToken: string;
};

export const signup = async (
  name: string,
  email: string,
  password: string,
  type: string,
  bio: string
): Promise<AxiosResponse<SignupResponse>> => {
  return await apiClient.post("/auth/signup", {
    name,
    email,
    password,
    type,
    bio,
  });
};

type GoogleSignInResponse = {
  user: User;
  accessToken: string;
  refreshToken: string;
};

export const googleSignIn = async (
  credentialResponse: CredentialResponse,
  type?: string,
  bio?: string
): Promise<AxiosResponse<GoogleSignInResponse>> => {
  return await apiClient.post("/auth/google", {
    credentialResponse,
    type,
    bio,
  });
};

type RefreshResponse = {
  accessToken: string;
  refreshToken: string;
};

export const refresh = async (): Promise<AxiosResponse<RefreshResponse>> => {
  return await apiClient.post(
    "/auth/refresh",
    {},
    {
      headers: refreshTokenHeaders(),
    }
  );
};

// export const updateUserProfile = async (
//   updatedUser: UpdateUserInput
// ): Promise<AxiosResponse<{ user: UpdateUserInput }>> => {
//   return await apiClient.put("/auth/update-profile", updatedUser, {
//     headers: headers(),
//   });
// };

// export const updateUserBioType = async (
//   updatedUser: UpdateUserGoogleInput
// ): Promise<AxiosResponse<{ user: UpdateUserGoogleInput }>> => {
//   return await apiClient.put("/auth/update-additional-info", updatedUser, {
//     headers: headers(),
//   });
// };
