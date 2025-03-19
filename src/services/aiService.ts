import { AxiosResponse } from "axios";
import { headers } from "./authService";
import apiClient from "./apiClient";
import { AiDescription } from "@/types";

export const getAiDescription = async (
  organization: AiDescription["description"]
): Promise<AxiosResponse<AiDescription>> => {
  return await apiClient.get(`/ai/${organization}`, { headers: headers() });
};
