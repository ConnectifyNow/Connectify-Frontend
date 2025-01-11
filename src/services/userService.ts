import { AxiosResponse } from "axios";
import { User } from "../types/index";
import { headers } from "./authService";
import apiClient from "./apiClient";

export const getUsers = async (): Promise<AxiosResponse<User[]>> => {
  return await apiClient.get(`/users`, { headers: headers() });
};

export const getUserById = async (
  userId: User["id"]
): Promise<AxiosResponse<User>> => {
  return await apiClient.get(`/users/${userId}`, { headers: headers() });
};
