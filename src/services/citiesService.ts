import { GetIdNameResponse } from "../types/index";
import { headers } from "./authService";
import apiClient from "./apiClient";
import { AxiosResponse } from "axios";

export const getCities = async (): Promise<
  AxiosResponse<GetIdNameResponse>
> => {
  return await apiClient.get(`/cities`, {
    headers: headers()
  });
};
