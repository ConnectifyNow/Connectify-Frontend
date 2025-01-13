import { CreateVolunteerResponse, SimpleVolunteer } from "../types/index";
import { headers } from "./authService";
import apiClient from "./apiClient";
import { AxiosResponse } from "axios";

export const createVolunteer = async (
  volunteer: SimpleVolunteer
): Promise<AxiosResponse<CreateVolunteerResponse>> => {
  return await apiClient.post(`/volunteers`, volunteer, {
    headers: headers()
  });
};
