import { AxiosResponse } from "axios";
import { Post, User } from "../types/index";
import apiClient from "./apiClient";
import { headers } from "./authService";

export const getPosts = async (): Promise<AxiosResponse<Post[]>> => {
  return await apiClient.get(`/posts`, { headers: headers() });
};

export const getPostsByUserId = async (
  userId: User["id"]
): Promise<AxiosResponse<Post>> => {
  return await apiClient.get(`/posts/user/${userId}`, { headers: headers() });
};
