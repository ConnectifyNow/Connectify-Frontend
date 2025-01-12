import { Volunteer } from "../types/index";
import { headers } from "./authService";
import apiClient from "./apiClient";

export const createVolunteer = async (volunteer: Volunteer) => {
  return await apiClient.post(`/volunteer`, volunteer, {
    headers: headers()
  });
};
