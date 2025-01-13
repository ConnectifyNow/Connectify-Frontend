import { GetIdNameResponse } from "../types/index";
import { headers } from "./authService";
import apiClient from "./apiClient";
import { AxiosResponse } from "axios";

export const getSkills = async (): Promise<
  AxiosResponse<GetIdNameResponse>
> => {
  return await apiClient.get(`/skills`, {
    headers: headers()
  });
};
