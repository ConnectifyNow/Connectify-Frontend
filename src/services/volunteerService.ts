import { User, Volunteer } from "../types/index";
import { headers } from "./authService";
import apiClient from "./apiClient";
import { AxiosResponse } from "axios";

export const getVolunteerByUserId = async (
  userId: User["id"]
): Promise<AxiosResponse<Volunteer>> => {
  return await apiClient.get(`/volunteer/user/${userId}`, {
    headers: headers(),
  });
};

export const createVolunteer = async (volunteer: Volunteer) => {
  return await apiClient.post(`/volunteer`, volunteer, {
    headers: headers(),
  });
};
