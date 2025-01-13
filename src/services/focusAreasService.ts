import { GetIdNameResponse } from "../types/index";
import { headers } from "./authService";
import apiClient from "./apiClient";
import { AxiosResponse } from "axios";

export const getFocusAreas = async (): Promise<
  AxiosResponse<GetIdNameResponse>
> => {
  return await apiClient.get(`/focus-areas`, {
    headers: headers()
  });
};
