import { ApiPost} from "../types/index";
import { headers } from "./authService";
import apiClient from "./apiClient";

export const createPost = async (post: ApiPost) => {
  return await apiClient.post(`/posts`, post, {
    headers: headers(),
  });
};
