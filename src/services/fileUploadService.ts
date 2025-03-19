import { AxiosResponse } from "axios";
import { ImageUploadResponse } from "../types/index";
import { headers } from "./authService";
import apiClient from "./apiClient";

export const uploadImage = async (
  photo: File
): Promise<AxiosResponse<ImageUploadResponse>> => {
  const formData = new FormData();
  formData.append("file", photo);
  return await apiClient.post(`/file/image`, formData, {
    headers: {
      ...headers(),
      "Content-Type": "multipart/form-data",
    },
  });
};
