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

export const deletePost = async (postId: string) => {
  return await apiClient.delete(`/posts/${postId}`, {
    headers: headers(),
  });
};

//TODO: Implement likeComment in the backend
// export const likeComment = async (postId: string, commentId: string) => {
//   return await apiClient.put(
//     `/posts/${postId}/comments/${commentId}/like`,
//     {},
//     {
//       headers: headers(),
//     }
//   );
// };

export const addComment = async (postId: string, comment: Comment) => {
  return await apiClient.post(`/posts/${postId}/comment`, comment, {
    headers: headers(),
  });
};

export const updatePost = async (post: ApiPost) => {
  return await apiClient.put(`/posts/${post.id}`, post, {
    headers: headers(),
  });
}
