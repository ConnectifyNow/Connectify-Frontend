import { AxiosResponse } from "axios";
import { reqApiUser, User } from "../types/index";
import apiClient from "./apiClient";
import { headers } from "./authService";

export const getUsers = async (): Promise<AxiosResponse<User[]>> => {
  return await apiClient.get(`/users`, { headers: headers() });
};

export const getUserById = async (
  userId: User["_id"]
): Promise<AxiosResponse<User>> => {
  return await apiClient.get(`/users/${userId}`, { headers: headers() });
};

export const updateUserApi = async (user: reqApiUser) => {
  return await apiClient.put(`/users/${user._id}`, user, {
    headers: headers(),
  });
};
