import { ApiComment, ApiPost, reqApiPost } from "../types/index";
import { headers } from "./authService";
import apiClient from "./apiClient";

export const createPost = async (post: reqApiPost) => {
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

export const deletePost = async (postId: string) => {
  return await apiClient.delete(`/posts/${postId}`, {
    headers: headers(),
  });
};

export const likeComment = async (commentId: string) => {
  return await apiClient.put(
    `/comments/${commentId}/like`,
    {},
    {
      headers: headers(),
    }
  );
};

export const addCommentToPost = async (postId: string, comment: ApiComment) => {
  return await apiClient.post(`/posts/${postId}/comment`, comment, {
    headers: headers(),
  });
};

export const updatePost = async (post: ApiPost) => {
  return await apiClient.put(`/posts/${post._id}`, post, {
    headers: headers(),
  });
};
