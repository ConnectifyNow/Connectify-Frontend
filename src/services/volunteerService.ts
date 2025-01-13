import {
  CreateVolunteerResponse,
  SimpleVolunteer,
  User,
  Volunteer,
} from "../types/index";
import { headers } from "./authService";
import apiClient from "./apiClient";
import { AxiosResponse } from "axios";

export const createVolunteer = async (
  volunteer: SimpleVolunteer
): Promise<AxiosResponse<CreateVolunteerResponse>> => {
  return await apiClient.post(`/volunteers`, volunteer, {
    headers: headers(),
  });
};

export const getVolunteerByUserId = async (
  userId: User["_id"]
): Promise<AxiosResponse<Volunteer>> => {
  return await apiClient.get(`/volunteers/user/${userId}`, {
    headers: headers(),
  });
};
