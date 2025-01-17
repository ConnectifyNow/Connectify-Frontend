import { AxiosResponse } from "axios";
import {
  CreateVolunteerResponse,
  PaginationSimpleVolunteer,
  reqApiVolunteer,
  SimpleVolunteer,
} from "../types/index";
import apiClient from "./apiClient";
import { headers } from "./authService";

export const createVolunteer = async (
  volunteer: SimpleVolunteer
): Promise<AxiosResponse<CreateVolunteerResponse>> => {
  return await apiClient.post(`/volunteers`, volunteer, {
    headers: headers(),
  });
};

export const getVolunteers = async (
  page = 1,
  limit = 10
): Promise<AxiosResponse<PaginationSimpleVolunteer>> => {
  return await apiClient.get(`/volunteers?page=${page}&limit=${limit}`, {
    headers: headers(),
  });
};

export const updateVolunteerApi = async (Volunteer: reqApiVolunteer) => {
  return await apiClient.put(`/volunteers/${Volunteer._id}`, Volunteer, {
    headers: headers(),
  });
};
