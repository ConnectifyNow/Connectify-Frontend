import { ApiPost } from "../types/index";
import { headers } from "./authService";
import apiClient from "./apiClient";

export const createPost = async (post: ApiPost) => {
  return await apiClient.post(`/posts`, post, {
    headers: headers(),
  });
};

export const likePostApi = async (postId: string, userId: string) => {
  return await apiClient.put(
    `/posts/${postId}/like`,
    { userId },
    {
      headers: headers(),
    }
  );
};

export const getPosts = async () => {
  return await apiClient.get(`/posts`, {
    headers: headers(),
  });
};
