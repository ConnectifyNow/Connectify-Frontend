import { ApiComment, reqApiPost } from "../types/index";
import useUserStore from "../stores/setUserStore";
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

export const getPosts = async (
  skip: number,
  top: number,
  type: string,
  skills: string[]
) => {
  const skillsOptions = skills.join(",");
  const baseQuery = `/posts?postType=${type}&skills=${skillsOptions}&skip=${skip}&top=${top}`;
  const userIdFilter =
    type === "my" ? `&userId=${useUserStore.getState()._id}` : "";
  const query = baseQuery + userIdFilter;
  const d = await apiClient.get(query, {
    headers: headers(),
  });
  return {
    d,
    hasMore: d.data.length === 0,
  };
};

export const deletePostApi = async (postId: string) => {
  return await apiClient.delete(`/posts/${postId}`, {
    headers: headers(),
  });
};

export const likeCommentApi = async (userId: string, commentId: string) => {
  return await apiClient.put(
    `/comments/${commentId}/like`,
    { userId },
    {
      headers: headers(),
    }
  );
};

export const addCommentToPost = async (postId: string, comment: ApiComment) => {
  return await apiClient.post(
    `/posts/${postId}/comment`,
    { text: comment.text, userId: comment.user },
    {
      headers: headers(),
    }
  );
};

export const updatePostApi = async (post: reqApiPost) => {
  return await apiClient.put(`/posts/${post._id}`, post, {
    headers: headers(),
  });
};
